import { promises as fs } from 'node:fs'
import path from 'node:path'
import select from '@inquirer/select'
import input from '@inquirer/input'
import * as packageConfig from '../package'

import * as context from '../../context'
import dirname from '../../services/dirname'
import getPullRequestTemplateFilename from './utils/getPullRequestTemplateFilename'
import printTerminal from '../../services/terminal/printTerminal'
import getTemplatePath from '../../getTemplatePath'

const TEMPLATES = getTemplatePath()

const generatePullRequestTemplate = async () => {
  await context.init()

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({
    message: 'Path:',
    default: initialPath,
  })

  const pullRequestTemplateFilename =
    getPullRequestTemplateFilename(repositoryPath)

  try {
    await fs.access(pullRequestTemplateFilename)

    console.log('Pull request template already exists')
  } catch (error) {
    const templateFilename = getPullRequestTemplateFilename(TEMPLATES)

    const templateContent = await fs.readFile(templateFilename, 'utf-8')

    await fs.mkdir(path.dirname(pullRequestTemplateFilename), {
      recursive: true,
    })

    await fs.writeFile(pullRequestTemplateFilename, templateContent)

    printTerminal('Pull request template created')
  }
}

export default generatePullRequestTemplate
