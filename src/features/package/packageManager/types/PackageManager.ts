export default interface PackageManager {
  getConfigFile(): string
  getCommand(script: string): string
}
