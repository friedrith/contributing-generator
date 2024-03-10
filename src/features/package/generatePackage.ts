import { promises as fs } from 'node:fs'
import input from '@inquirer/input'

import * as context from '../../context'
import * as git from '../../services/git'
import getPackageConfigFilename from './utils/getPackageConfigFilename'
import printTerminal from '../../services/terminal/printTerminal'
import omit from './utils/omit'

const generatePackage = async () => {
  await context.init()

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({
    message: 'Path:',
    default: initialPath,
  })

  const description = await input({
    message: 'Description:',
    default: (await context.getProject()).description,
  })

  const keywords = await input({
    message: 'Keywords (separated with ","):',
    default: (await context.getProject()).keywords.join(', '),
  })

  const name = await git.findName()

  const email = await git.findEmail()

  const author = await input({
    message: 'Author:',
    default: `${name} <${email}>`,
  })

  const packageConfigFilename = getPackageConfigFilename(repositoryPath)

  const content = await fs.readFile(packageConfigFilename, 'utf-8')

  const packageConfig = JSON.parse(content)

  const newPackageConfig = {
    name: packageConfig.name,
    description,
    keywords: keywords.split(',').map(keyword => keyword.trim()),
    author,
    ...omit(packageConfig, ['description', 'keywords', 'author']),
  }

  await fs.writeFile(
    packageConfigFilename,
    JSON.stringify(newPackageConfig, null, 2),
  )

  printTerminal('package.json updated')
}

export default generatePackage
