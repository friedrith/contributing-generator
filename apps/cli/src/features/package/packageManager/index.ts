import { promises as fs } from 'node:fs'
import path from 'node:path'
import pnpm from './pnpm'
import npm from './npm'
import yarn from './yarn'
import PackageManager from './PackageManager'

const packageManagers: Record<string, PackageManager> = {
  pnpm,
  npm,
  yarn,
}

export const detectPackageManager = async (repositoryPath: string) => {
  const listOfPackageManagers = Object.entries(packageManagers)

  for (const packageManager of listOfPackageManagers) {
    const lockFilename = packageManager[1].getConfigFile()
    const lockFile = path.join(repositoryPath, lockFilename)
    try {
      await fs.access(lockFile)
      return packageManager[0]
    } catch {}
  }

  return null
}

export const getCommand = async (
  repositoryPath: string,
  script: string
): Promise<string> => {
  const packageManager = await detectPackageManager(repositoryPath)

  if (packageManager === null) return ''

  return packageManagers[packageManager].getCommand(script)
}
