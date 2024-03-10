import path from 'node:path'

const getLicenseFilename = (repositoryPath: string) =>
  path.join(repositoryPath, 'LICENSE')

export default getLicenseFilename
