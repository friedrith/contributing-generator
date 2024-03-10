import { promises as fs } from 'node:fs'
import getPackageConfigFilename from './getPackageConfigFilename'

const findPackageConfig = async (repositoryPath: string) => {
  const packageConfigFilename = getPackageConfigFilename(repositoryPath)

  const defaultProject = {
    name: '',
    description: '',
    version: '',
  }

  try {
    const content = await fs.readFile(packageConfigFilename, 'utf-8')

    const packageJson = JSON.parse(content)

    return packageJson
  } catch {
    return defaultProject
  }
}

export default findPackageConfig
