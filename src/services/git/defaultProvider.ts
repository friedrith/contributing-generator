import path from 'node:path'

import Organization from '../../types/Organization'
import Project from '../../types/Project'
import Repository from '../../types/Repository'
import GitProvider from './types/GitProvider'
import extractUsername from './utils/extractUsername'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isProvider = (_url: string) => true //  it is the default provider so it should accept everything

const getProviderName = () => 'none'

const findOrganization = async (url: string): Promise<Organization> => {
  const username = extractUsername(url)

  return {
    username,
    name: '',
    email: null,
  }
}

const getIssueTrackerUrl = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _organization: Organization,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _repository: Repository,
) => ''

const getRepositoryInformation = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _username: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _name: string,
): Promise<Partial<Project>> => ({})

const getSecurityReportingUrl = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _username: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _name: string,
) => ''

const getPullRequestTemplateFilename = (repositoryPath: string) =>
  path.join(repositoryPath, 'PULL_REQUEST_TEMPLATE.md')

export default {
  isProvider,
  getProviderName,
  findOrganization,
  getIssueTrackerUrl,
  getRepositoryInformation,
  getSecurityReportingUrl,
  getPullRequestTemplateFilename,
} satisfies GitProvider
