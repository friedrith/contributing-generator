import path from 'node:path'

const getCodeOfConductFilename = (repositoryPath: string) =>
  path.join(repositoryPath, 'CODE_OF_CONDUCT.md')

export default getCodeOfConductFilename
