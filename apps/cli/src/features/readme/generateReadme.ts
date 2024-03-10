import path from 'node:path'
import { promises as fs } from 'node:fs'

import select from '@inquirer/select'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import * as packageManager from '../package/packageManager'

import * as context from '../../context'
import setSection from './section/setSection'
import findPackageConfig from '../package/utils/findPackageConfig'
import printTerminal from '../../services/terminal/printTerminal'

const generateReadme = async () => {
  await context.init()

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({ message: 'Path:', default: initialPath })

  const readmeFilename = path.join(repositoryPath, 'README.md')

  let created = false

  try {
    await fs.access(readmeFilename)
  } catch {
    const project = await context.getProject()
    created = true
    fs.writeFile(readmeFilename, `# ${project.name}\n\n`)
  }

  let readmeContent = await fs.readFile(readmeFilename, 'utf-8')

  const addGetStarted = await confirm({ message: 'Add "Get Started" section?' })
  if (addGetStarted) {
    const installCommand = await packageManager.getCommand(
      repositoryPath,
      'install'
    )

    const packageConfig = await findPackageConfig(repositoryPath)

    const startScripts = ['start', 'dev']
    const availableScripts = Object.keys(packageConfig?.scripts ?? [])
    const startScript = startScripts.find(script =>
      availableScripts.includes(script)
    )

    const startCommand = await packageManager.getCommand(
      repositoryPath,
      startScript
    )

    const getStartedDescription = `\`\`\`bash
${installCommand} # Install dependencies${
      startScript ? `\n\n${startCommand} # Start the project` : ''
    }
\`\`\``

    const { content } = setSection(
      readmeContent,
      'Get Started',
      getStartedDescription
    )

    readmeContent = content
  }

  fs.writeFile(readmeFilename, readmeContent)

  console.log()
  console.log(readmeContent)

  if (created) {
    printTerminal('README file generated')
  } else {
    printTerminal('README file created')
  }
}

export default generateReadme
