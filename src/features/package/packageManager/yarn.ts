import PackageManager from './types/PackageManager'

const yarn: PackageManager = {
  getConfigFile: () => 'yarn.lock',
  getCommand: (script: string) => `yarn ${script}`,
}

export default yarn
