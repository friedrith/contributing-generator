import * as git from './services/git/git'
import Organization from './types/Organization'
import Project from './types/Project'
import Repository from './types/Repository'

interface Context {
  organization: Organization
  year: string
  project: Project
  issueTracker: { url: string }
  repository: Repository
}

const context: Context = {
  organization: {
    name: '',
    username: '',
  },
  year: new Date().getFullYear().toString(),
  project: {
    name: '',
  },
  issueTracker: {
    url: '',
  },
  repository: {
    provider: '',
    name: '',
    remoteOriginUrl: '',
    path: '',
  },
}

export const getContext = () => context

export const getYear = async () => context.year

export const setContext = (partialContext: Partial<Context>) => {
  Object.entries(partialContext).forEach(([key, value]) => {
    context[key] = value
  })
}

export const getOrganization = async () => context.organization

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

export const getIssueTrackerUrl = async () => {
  const organization = await getOrganization()
  const repository = context.repository

  return git.findIssueTrackerUrl(organization, repository)
}

export const init = async () => {
  const url = await git.findRepositoryUrl()

  const organization = await git.findOrganization(url)

  const repository = await git.findRepository(url)

  setContext({
    organization,
    repository,
    issueTracker: {
      url: await git.findIssueTrackerUrl(organization, repository),
    },
  })
}
