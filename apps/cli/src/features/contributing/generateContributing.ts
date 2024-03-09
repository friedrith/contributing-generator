import { promises as fs } from 'node:fs'
import path from 'node:path'
import confirm from '@inquirer/confirm'
import input from '@inquirer/input'

import dirname from '../../services/dirname'
import * as context from '../../context'
import printTerminal from '../../services/terminal/printTerminal'
import setVariable from '../../services/template/setVariable'
import showSection from '../../services/template/showSection'
import hideSection from '../../services/template/hideSection'

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), './utils/templates')

const CONTRIBUTING = 'CONTRIBUTING.md'

export const getFullPath = (basename: string) => path.join(TEMPLATES, basename)

const generateContributing = async () => {
  const templateFilename = path.join(TEMPLATES, CONTRIBUTING)

  const templateContent = await fs.readFile(templateFilename, 'utf-8')

  let contributingContent = templateContent

  await context.init()

  const addIssueSection = await confirm({
    message: 'Add a section "how to create an issue"?',
  })
  if (addIssueSection) {
    const issueTrackerUrl = await input({
      message: 'Issue tracker url:',
      default: await context.getIssueTrackerUrl(),
    })

    contributingContent = setVariable(
      contributingContent,
      'issueTrackerUrl',
      issueTrackerUrl
    )

    contributingContent = showSection(contributingContent, 'issue')
  } else {
    contributingContent = hideSection(contributingContent, 'issue')
  }

  const addCommitSection = await confirm({
    message:
      'Add a section "how to create a commit (following conventional commit format)"?',
  })
  if (addCommitSection) {
    contributingContent = showSection(contributingContent, 'commit')
  } else {
    contributingContent = hideSection(contributingContent, 'commit')
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
