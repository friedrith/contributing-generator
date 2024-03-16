import path from 'node:path'

import Organization from '../../types/Organization'
import Project from '../../types/Project'
import Repository from '../../types/Repository'
import GitProvider from './types/GitProvider'
import hasDomain from './utils/hasDomain'
import extractUsername from './utils/extractUsername'

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

const isProvider = (url: string) => hasDomain('gitlab.com', url)

const getProviderName = () => 'gitlab'

const getIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository,
) => `https://gitlab.com/${organization.username}/${repository.name}/-/issues`

const findOrganization = async (url: string): Promise<Organization> => {
  const username = extractUsername(url)

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

// https://docs.gitlab.com/ee/user/project/description_templates.html
const getPullRequestTemplateFilename = (repositoryPath: string) =>
  path.join(repositoryPath, '.gitlab', 'merge_request_templates', 'TEMPLATE.md')

export default {
  isProvider,
  getProviderName,
  findOrganization,
  getIssueTrackerUrl,
  getRepositoryInformation,
  getSecurityReportingUrl,
  getPullRequestTemplateFilename,
} satisfies GitProvider
