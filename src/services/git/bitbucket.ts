import path from 'node:path'
import Organization from '../../types/Organization'
import Project from '../../types/Project'
import Repository from '../../types/Repository'
import GitProvider from './types/GitProvider'
import hasDomain from './utils/hasDomain'
import extractUsername from './utils/extractUsername'

const isProvider = (url: string) => hasDomain('bitbucket.org', url)

const getProviderName = () => 'bitbucket'

const getIssueTrackerUrl = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _organization: Organization,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _repository: Repository,
) => ''

const findOrganization = async (url: string): Promise<Organization> => {
  const username = extractUsername(url)

  return {
    username,
    name: '',
    email: null,
  }
}

const getRepositoryInformation = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _username: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _name: string,
): Promise<Partial<Project>> => {
  return {}
}

const getPullRequestTemplateFilename = (repositoryPath: string) =>
  path.join(repositoryPath, 'PULL_REQUEST_TEMPLATE.md')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSecurityReportingUrl = (_username: string, _repositoryName: string) =>
  ''

export default {
  isProvider,
  getProviderName,
  findOrganization,
  getIssueTrackerUrl,
  getRepositoryInformation,
  getSecurityReportingUrl,
  getPullRequestTemplateFilename,
} satisfies GitProvider
