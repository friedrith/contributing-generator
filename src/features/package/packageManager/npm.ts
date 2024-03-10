import PackageManager from './PackageManager'

const npm: PackageManager = {
  getConfigFile: () => 'package-lock.yaml',
  getCommand: (script: string) =>
    ['start', 'test'].includes(script) ? `npm ${script}` : `pnpm run ${script}`,
}

export default npm
