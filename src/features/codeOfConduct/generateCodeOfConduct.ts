import { promises as fs } from 'node:fs'
import input from '@inquirer/input'

import * as git from '../../services/git'
import * as context from '../../context'
import setVariable from '../../services/template/setVariable'
import getCodeOfConductFilename from './utils/getCodeOfConductFilename'
import printTerminal from '../../services/terminal/printTerminal'
import getTemplatePath from '../../getTemplatePath'

const generateCodeOfConduct = async () => {
  await context.init()

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({
    message: 'Path:',
    default: initialPath,
  })

  const templateFilename = getCodeOfConductFilename(getTemplatePath())

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
