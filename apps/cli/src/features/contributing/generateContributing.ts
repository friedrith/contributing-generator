import input from '@inquirer/input'
import { promises as fs } from 'node:fs'
import path from 'node:path'

import dirname from '../../services/dirname'
import * as context from '../../context'
import printTerminal from '../../services/terminal/printTerminal'

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), './utils/templates')

const CONTRIBUTING = 'CONTRIBUTING.md'

export const getFullPath = (basename: string) => path.join(TEMPLATES, basename)

const generateContributing = async () => {
  const templateFilename = path.join(TEMPLATES, CONTRIBUTING)

  const templateContent = await fs.readFile(templateFilename, 'utf-8')

  const contributingContent = templateContent

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({ message: 'Path:', default: initialPath })

  const generatedContributingFilename = path.join(repositoryPath, CONTRIBUTING)

  await fs.writeFile(generatedContributingFilename, contributingContent)

  console.log()
  console.log(contributingContent)

  printTerminal('Contributing file generated')
}

export default generateContributing
