import * as git from './services/git'

interface Context {
  organization: string
  year: string
  project: {
    name: string
  }
  repository: {
    provider: string
    name: string
    remoteOriginUrl: string
    path: string
  }
}

const context: Context = {
  organization: '',
  year: new Date().getFullYear().toString(),
  project: {
    name: '',
  },
  repository: {
    provider: '',
    name: '',
    remoteOriginUrl: '',
    path: '',
  },
}

export const getContext = () => context

export const setContext = (partialContext: Partial<Context>) => {
  Object.entries(partialContext).forEach(([key, value]) => {
    context[key] = value
  })
}

const findOrganization = async () => {
  const { organization, provider, url, name } =
    await git.findRepositoryInformation()

  setContext({
    organization,
    project: {
      name: name,
    },
    repository: {
      provider,
      name,
      remoteOriginUrl: url,
      path: context.repository.path,
    },
  })

  return organization
}

export const getOrganization = async () =>
  context.organization || (await findOrganization())

export const getProject = async () => context.project

const findRepositoryPath = async () => {
  const repositoryPath = await git.findRepositoryPath()

  setContext({
    repository: {
      ...context.repository,
      path: repositoryPath,
    },
  })

  return repositoryPath
}

export const getRepositoryPath = async () =>
  context.repository.path || (await findRepositoryPath())
