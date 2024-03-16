import path from 'node:path'
import Organization from '../../types/Organization'
import Project from '../../types/Project'
import Repository from '../../types/Repository'
import GitProvider from './types/GitProvider'
import hasDomain from './utils/hasDomain'
import extractUsername from './utils/extractUsername'

const getGithubOrganization = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (response.status === 404) {
      return {}
    }

    const user: { name?: string; email?: string } = await response.json()

    return {
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    return {}
  }
}

const isProvider = (url: string) => hasDomain('github.com', url)

const getProviderName = () => 'github'

const getIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository,
) => `https://github.com/${organization.username}/${repository.name}/issues`

const findOrganization = async (url: string): Promise<Organization> => {
  const username = extractUsername(url)
  const organization = await getGithubOrganization(username)

  return {
    username,
    name: organization?.name ?? username,
    email: organization?.email,
  }
}

const getRepositoryInformation = async (
  username: string,
  name: string,
): Promise<Partial<Project>> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${name}`,
    )

    if (response.status === 404) {
      return {}
    }

    const repo: { description?: string; topics?: string[] } =
      await response.json()

    return {
      description: repo.description,
      keywords: repo.topics,
    }
  } catch (error) {
    return {}
  }
}

const getPullRequestTemplateFilename = (repositoryPath: string) =>
  path.join(repositoryPath, '.github', 'PULL_REQUEST_TEMPLATE.md')

const getSecurityReportingUrl = (username: string, repositoryName: string) =>
  `https://github.com/${username}/${repositoryName}/security/advisories`

export default {
  isProvider,
  getProviderName,
  findOrganization,
  getIssueTrackerUrl,
  getRepositoryInformation,
  getSecurityReportingUrl,
  getPullRequestTemplateFilename,
} satisfies GitProvider
