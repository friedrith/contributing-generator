import { promises as fs } from "node:fs";
import path from "node:path";
import confirm from "@inquirer/confirm";
import input from "@inquirer/input";

import dirname from "../../services/dirname";
import * as context from "../../context";
import printTerminal from "../../services/terminal/printTerminal";
import setVariable from "../../services/template/setVariable";
import showSection from "../../services/template/showSection";
import hideSection from "../../services/template/hideSection";
import * as packageConfig from "../package";
import * as readme from "../readme";
import * as packageManager from "../package/packageManager";
import getContributingContentInReadme from "./utils/getContributingContentInReadme";
import getContributingFilename from "./utils/getContributingFilename";

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), "./utils/templates");

export const getFullPath = (basename: string) => path.join(TEMPLATES, basename);

const generateContributing = async () => {
  const templateFilename = getContributingFilename(TEMPLATES);

  const templateContent = await fs.readFile(templateFilename, "utf-8");

  let contributingContent = templateContent;

  await context.init();

  const addIssueSection = await confirm({
    message: 'Add a section "how to create an issue"?',
  });
  if (addIssueSection) {
    const issueTrackerUrl = await input({
      message: "Issue tracker url:",
      default: await context.getIssueTrackerUrl(),
    });

    contributingContent = setVariable(
      contributingContent,
      "issueTrackerUrl",
      issueTrackerUrl,
    );

    contributingContent = showSection(contributingContent, "issue");
  } else {
    contributingContent = hideSection(contributingContent, "issue");
  }

  const addCommitSection = await confirm({
    message:
      'Add a section "how to create a commit (following conventional commit format)"?',
  });
  if (addCommitSection) {
    contributingContent = showSection(contributingContent, "commit");
  } else {
    contributingContent = hideSection(contributingContent, "commit");
  }

  const addTestSection = await confirm({
    message: 'Add a section "how to write tests"?',
  });

  const repositoryPath = await context.getRepositoryPath();

  if (addTestSection) {
    try {
      const packageJsonFilename =
        packageConfig.getPackageConfigFilename(repositoryPath);

      const packageJson = await fs.readFile(packageJsonFilename, "utf-8");

      if (packageConfig.hasProperty(packageJson, "test")) {
        const command = await packageManager.getCommand(repositoryPath, "test");
        const commandTest = `You can launch tests using \`${command}\`.`;
        contributingContent = setVariable(
          contributingContent,
          "commandTest",
          commandTest,
        );
      } else {
        contributingContent = setVariable(
          contributingContent,
          "commandTest",
          "",
        );
      }
    } catch (error) {
      contributingContent = setVariable(contributingContent, "commandTest", "");
    }

    contributingContent = showSection(contributingContent, "test");
  } else {
    contributingContent = hideSection(contributingContent, "test");
  }

  const contributingPath = getContributingFilename(repositoryPath);

  const generatedContributingFilename = await input({
    message: "CONTRIBUTING Path:",
    default: contributingPath,
  });

  await fs.writeFile(generatedContributingFilename, contributingContent);

  console.log();
  console.log(contributingContent);

  printTerminal("Contributing file generated");

  try {
    const readmeFilename = path.join(repositoryPath, "README.md");

    await fs.access(readmeFilename);

    const readmeContent = await fs.readFile(readmeFilename, "utf-8");

    const { content: newReadme, message } = readme.setSection(
      readmeContent,
      "Contributing",
      getContributingContentInReadme(),
    );

    await fs.writeFile(readmeFilename, newReadme);
    printTerminal(message);
  } catch (error) {}
};

export default generateContributing;
