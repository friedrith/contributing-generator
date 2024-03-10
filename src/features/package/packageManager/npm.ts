import PackageManager from './PackageManager'

const commandsWithoutRun = ['start', 'test', 'install']

const npm: PackageManager = {
  getConfigFile: () => 'package-lock.yaml',
  getCommand: (script: string) =>
    commandsWithoutRun.includes(script) ? `npm ${script}` : `npm run ${script}`,
}

export default npm
