import { promises as fs } from 'node:fs'
import path from 'node:path'
import confirm from '@inquirer/confirm'
import input from '@inquirer/input'

import dirname from '../../services/dirname'
import * as context from '../../context'
import printTerminal from '../../services/terminal/printTerminal'
import setProperty from './utils/setProperty'

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), './utils/templates')

const CONTRIBUTING = 'CONTRIBUTING.md'

export const getFullPath = (basename: string) => path.join(TEMPLATES, basename)

const generateContributing = async () => {
  const templateFilename = path.join(TEMPLATES, CONTRIBUTING)

  const templateContent = await fs.readFile(templateFilename, 'utf-8')

  let contributingContent = templateContent

  const addIssueSection = await confirm({ message: 'Add issue section?' })

  await context.init()

  if (addIssueSection) {
    const issueTrackerUrl = await input({
      message: 'Issue tracker url:',
      default: await context.getIssueTrackerUrl(),
    })

    contributingContent = setProperty(
      contributingContent,
      'issueTrackerUrl',
      issueTrackerUrl
    )
  }

  const initialPath = await context.getRepositoryPath()
  const contributingPath = path.join(initialPath, CONTRIBUTING)

  const generatedContributingFilename = await input({
    message: 'CONTRIBUTING Path:',
    default: contributingPath,
  })

  await fs.writeFile(generatedContributingFilename, contributingContent)

  console.log()
  console.log(contributingContent)

  printTerminal('Contributing file generated')
}

export default generateContributing
