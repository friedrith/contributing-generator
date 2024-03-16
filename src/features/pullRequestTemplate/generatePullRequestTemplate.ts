import { promises as fs } from 'node:fs'
import path from 'node:path'
import input from '@inquirer/input'

import * as context from '../../context'
import * as git from '../../services/git'
import printTerminal from '../../services/terminal/printTerminal'
import getTemplatePath from '../../getTemplatePath'

const TEMPLATES = getTemplatePath()

const generatePullRequestTemplate = async () => {
  await context.init()

  const repository = await context.getRepository()

  const defaultFilename = git.getPullRequestTemplateFilename(
    repository,
    repository.path,
  )
  const pullRequestTemplateFilename = await input({
    message: 'Path:',
    default: defaultFilename,
  })

  try {
    await fs.access(pullRequestTemplateFilename)

    console.error('Pull request template already exists')
  } catch (error) {
    const templateFilename = git.getPullRequestTemplateFilename(
      repository,
      TEMPLATES,
    )

    const templateContent = await fs.readFile(templateFilename, 'utf-8')

    await fs.mkdir(path.dirname(pullRequestTemplateFilename), {
      recursive: true,
    })

    await fs.writeFile(pullRequestTemplateFilename, templateContent)

    printTerminal('Pull request template created')
  }
}

export default generatePullRequestTemplate
