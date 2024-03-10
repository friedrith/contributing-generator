import path from "node:path";

const getPackageConfigFilename = (repositoryPath: string) =>
  path.join(repositoryPath, "package.json");

export default getPackageConfigFilename;
