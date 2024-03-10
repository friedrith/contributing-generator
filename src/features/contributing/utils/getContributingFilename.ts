import path from 'node:path'

const getContributingFilename = (repositoryPath: string) =>
  path.join(repositoryPath, 'CONTRIBUTING.md')

export default getContributingFilename
