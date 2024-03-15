import path from 'node:path'

const getSecurityFilename = (repositoryPath: string) =>
  path.join(repositoryPath, '.github', 'SECURITY.md')

export default getSecurityFilename
