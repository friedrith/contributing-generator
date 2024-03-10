import findPackageConfig from './features/package/utils/findPackageConfig'
import * as git from './services/git'
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
    email: '',
  },
  year: new Date().getFullYear().toString(),
  project: {
    name: '',
    description: '',
    version: '',
    keywords: [],
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

export const getRepository = async () => context.repository

export const getIssueTrackerUrl = async () => {
  const organization = await getOrganization()
  const repository = context.repository

  return git.findIssueTrackerUrl(organization, repository)
}

const findKeywords = (...keywordsList: string[][]) => {
  for (const keywords of keywordsList) {
    if (keywords.length > 0) {
      return keywords
    }
  }

  return []
}

export const init = async () => {
  const url = await git.findRepositoryUrl()

  const organization = await git.findOrganization(url)

  const repository = await git.findRepository(url)

  const packageConfig = await findPackageConfig(repository.path)

  const repositoryInformation = await git.findRepositoryInformation(
    url,
    organization.username,
    repository.name,
  )

  setContext({
    project: {
      ...context.project,
      name: packageConfig.name || repository.name,
      description:
        packageConfig.description ||
        repositoryInformation.description ||
        context.project.description,
      version: packageConfig.version || context.project.version,
      keywords: findKeywords(
        packageConfig.keywords ?? [],
        repositoryInformation.keywords ?? [],
        context.project.keywords ?? [],
      ),
    },
    organization,
    repository,
    issueTracker: {
      url:
        packageConfig?.bugs?.url ??
        (await git.findIssueTrackerUrl(organization, repository)),
    },
  })
}
