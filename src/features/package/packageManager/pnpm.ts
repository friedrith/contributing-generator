import PackageManager from './types/PackageManager'

const getConfigFile = () => 'pnpm-lock.yaml'

const getCommand = (script: string) => `pnpm ${script}`

const pnpm: PackageManager = {
  getConfigFile,
  getCommand,
}

export default pnpm
