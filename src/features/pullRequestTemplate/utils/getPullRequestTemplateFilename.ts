import path from 'node:path'

const getPullRequestTemplateFilename = (repositoryPath: string) =>
  path.join(repositoryPath, '.github', 'PULL_REQUEST_TEMPLATE.md')

export default getPullRequestTemplateFilename
