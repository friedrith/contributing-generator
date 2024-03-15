import Organization from '../../../types/Organization'
import Project from '../../../types/Project'
import Repository from '../../../types/Repository'

export default interface GitProvider {
  isProvider: (url: string) => boolean
  getProviderName: () => string
  findOrganization: (url: string) => Promise<Organization>
  getIssueTrackerUrl: (
    organization: Organization,
    repository: Repository,
  ) => Promise<string>
  getRepositoryInformation: (
    username: string,
    name: string,
  ) => Promise<Partial<Project>>
  getSecurityReportingUrl: (username: string, name: string) => string
}
