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
import getContributingFilename from '../contributing/utils/getContributingFilename'
import getContributingContentInReadme from '../contributing/utils/getContributingContentInReadme'
import getLicenseFilename from '../license/utils/getLicenseFilename'
import getLicenseContentInReadme from '../license/utils/getLicenseContentInReadme'

const generateReadme = async () => {
  await context.init()

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({
    message: 'Path:',
    default: initialPath,
  })

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

  const addGetStartedSection = await confirm({
    message: 'Add "Get Started" section?',
  })

  const packageConfig = await findPackageConfig(repositoryPath)

  if (addGetStartedSection) {
    const installCommand = await packageManager.getCommand(
      repositoryPath,
      'install',
    )

    const startScripts = ['start', 'dev']
    const availableScripts = Object.keys(packageConfig?.scripts ?? [])
    const startScript = startScripts.find(script =>
      availableScripts.includes(script),
    )

    const startCommand = await packageManager.getCommand(
      repositoryPath,
      startScript,
    )

    const getStartedDescription = `\`\`\`bash
${installCommand} # Install dependencies${
      startScript ? `\n\n${startCommand} # Start the project` : ''
    }
\`\`\`
`

    const { content } = setSection(
      readmeContent,
      'Get Started',
      getStartedDescription,
    )

    readmeContent = content
  }

  try {
    const contributingFilename = getContributingFilename(repositoryPath)

    await fs.access(contributingFilename)

    const addContributingSection = await confirm({
      message: 'Add "Contributing" section?',
    })

    if (addContributingSection) {
      const { content } = setSection(
        readmeContent,
        'Contributing',
        getContributingContentInReadme(),
      )
      readmeContent = content
    }
  } catch {}

  try {
    const license = packageConfig?.license

    const licenseFilename = getLicenseFilename(repositoryPath)

    await fs.access(licenseFilename)

    if (license !== 'ISC') {
      const addLicenseSection = await confirm({
        message: 'Add "License" section?',
      })

      if (addLicenseSection) {
        const { content } = setSection(
          readmeContent,
          'License',
          getLicenseContentInReadme(license ?? 'MIT'),
        )
        readmeContent = content
      }
    }
  } catch {}

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
