import PackageManager from "./PackageManager";

const yarn: PackageManager = {
  getConfigFile: () => "yarn.lock",
  getCommand: (script: string) => `yarn ${script}`,
};

export default yarn;
