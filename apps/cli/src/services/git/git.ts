import util from 'node:util'
import { execFile } from 'node:child_process'
import * as github from './github'
import extractRepositoryName from './utils/extractRepositoryName'

export const findGitUrl = async () => {
  const { stdout } = await util.promisify(execFile)('git', [
    'config',
    '--get',
    'remote.origin.url',
  ])

  return stdout.replace('\n', '')
}

export const findRepositoryPath = async () => {
  const { stdout } = await util.promisify(execFile)('git', [
    'rev-parse',
    '--show-toplevel',
  ])

  return stdout.replace('\n', '')
}

const providers = [github]

const findAsyncSequential = async <T, P>(
  array: T[],
  predicate: (t: T) => Promise<P>
): Promise<P | undefined> => {
  for (const t of array) {
    const result = await predicate(t)
    if (result) {
      return result
    }
  }
  return undefined
}

export const findRepositoryInformation = async (): Promise<{
  organization: string
  provider: string
  name: string
  url: string
}> => {
  const url = await findGitUrl()

  const name = extractRepositoryName(url)

  const { organization, provider } = (await findAsyncSequential(
    providers,
    provider => provider.findRepositoryInformation(url)
  )) || { organization: '', provider: '' }

  return {
    organization,
    provider,
    name,
    url,
  }
}
