import Organization from '../../types/Organization'
import Project from '../../types/Project'
import Repository from '../../types/Repository'
import GitProvider from './types/GitProvider'

const getGitlabUser = async (username: string) => {
  try {
    const url = new URL('https://gitlab.com/api/v4/users')
    url.searchParams.append('username', username)

    const response = await fetch(url.toString())

    if (response.status === 404) {
      return {}
    }

    const user: { name: string; email: string } = (await response.json())[0]

    return {
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    return {}
  }
}

const HTTP_HOST = 'https://gitlab.com'

const isProvider = (url: string) =>
  url.startsWith('git@gitlab.com:') || url.startsWith(HTTP_HOST)

const getProviderName = () => 'gitlab'

const getIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository,
) => `https://gitlab.com/${organization.username}/${repository.name}/-/issues`

const findOrganization = async (url: string): Promise<Organization> => {
  const username = url.startsWith(HTTP_HOST)
    ? url.replace(HTTP_HOST, '').split('/')[1]
    : url.split(':')[1].split('/')[0]

  const user = await getGitlabUser(username)

  return {
    username,
    name: user?.name ?? username,
    email: user?.email,
  }
}

const getRepositoryInformation = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _username: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _name: string,
): Promise<Partial<Project>> => {
  // it seems gitlab doesn't provide any description or keywords
  // https://docs.gitlab.com/ee/api/repositories.html
  return {}
}

const getSecurityReportingUrl = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _username: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _name: string,
) => ''

export default {
  isProvider,
  getProviderName,
  findOrganization,
  getIssueTrackerUrl,
  getRepositoryInformation,
  getSecurityReportingUrl,
} satisfies GitProvider
