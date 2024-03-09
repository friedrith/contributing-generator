import util from 'node:util'
import { execFile } from 'node:child_process'
import * as github from './github'
import extractRepositoryName from './utils/extractRepositoryName'
import Organization from '../../types/Organization'
import Repository from '../../types/Repository'

const executeCommand = async (command: string, args: string[]) =>
  (await util.promisify(execFile)(command, args)).stdout.replace('\n', '')

export const findGitUrl = async () =>
  executeCommand('git', ['config', '--get', 'remote.origin.url'])

export const findRepositoryPath = async () =>
  executeCommand('git', ['rev-parse', '--show-toplevel'])

const providers = [github]

export const findRepositoryUrl = async () => findGitUrl()

export const findOrganization = async (url: string) =>
  await providers
    .find(provider => provider.isProvider(url))
    .findOrganization(url)

export const findRepository = async (url: string) => {
  const providerFunctions = providers.find(provider => provider.isProvider(url))

  return {
    provider: providerFunctions.getProviderName(),
    name: extractRepositoryName(url),
  }
}

export const findIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository
) => {
  const providerFunctions = providers.find(provider =>
    provider.isProvider(repository.remoteOriginUrl)
  )

  return providerFunctions.getIssueTrackerUrl(organization, repository)
}
