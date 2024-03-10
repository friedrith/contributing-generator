import { promises as fs } from 'node:fs'
import path from 'node:path'
import select from '@inquirer/select'
import input from '@inquirer/input'
import dirname from '../../services/dirname'

import * as git from '../../services/git'
import * as context from '../../context'
import setVariable from '../../services/template/setVariable'
import getCodeOfConductFilename from './utils/getCodeOfConductFilename'
import printTerminal from '../../services/terminal/printTerminal'

const TEMPLATES = path.join(dirname(import.meta.url), './utils/templates')

const generateCodeOfConduct = async () => {
  await context.init()

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({
    message: 'Path:',
    default: initialPath,
  })

  const templateFilename = getCodeOfConductFilename(TEMPLATES)

  try {
    let templateContent = await fs.readFile(templateFilename, 'utf-8')

    const email = await input({
      message: 'Contact email address:',
      default: await git.findEmail(),
    })

    templateContent = setVariable(templateContent, 'emailAddress', email)

    fs.writeFile(getCodeOfConductFilename(initialPath), templateContent)

    console.log()
    console.log(templateContent)

    printTerminal('Code of conduct generated')
  } catch {}
}

export default generateCodeOfConduct
