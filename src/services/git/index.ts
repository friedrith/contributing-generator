import util from 'node:util'
import { execFile } from 'node:child_process'
import github from './github'
import extractRepositoryName from './utils/extractRepositoryName'
import Organization from '../../types/Organization'
import Repository from '../../types/Repository'
import Project from '../../types/Project'
import GitProvider from './types/GitProvider'
import defaultProvider from './defaultProvider'

const executeCommand = async (command: string, args: string[]) =>
  (await util.promisify(execFile)(command, args)).stdout.replace('\n', '')

export const findGitUrl = async () =>
  executeCommand('git', ['config', '--get', 'remote.origin.url'])

export const findRepositoryPath = async () =>
  executeCommand('git', ['rev-parse', '--show-toplevel'])

export const findEmail = async () =>
  executeCommand('git', ['config', 'user.email'])

export const findName = async () =>
  executeCommand('git', ['config', 'user.name'])

const providers = [github, defaultProvider]

const findProvider = (url: string): GitProvider =>
  providers.find(provider => provider.isProvider(url))

export const findRepositoryUrl = async () => findGitUrl()

export const findOrganization = async (url: string) =>
  await providers
    .find(provider => provider.isProvider(url))
    .findOrganization(url)

export const findRepositoryInformation = async (
  url: string,
  username: string,
  name: string,
): Promise<Partial<Project>> =>
  findProvider(url).getRepositoryInformation(username, name)

export const findRepository = async (url: string): Promise<Repository> => {
  return {
    remoteOriginUrl: url,
    path: await findRepositoryPath(),
    provider: findProvider(url).getProviderName(),
    name: extractRepositoryName(url),
  }
}

export const findIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository,
) =>
  findProvider(repository.remoteOriginUrl).getIssueTrackerUrl(
    organization,
    repository,
  )
