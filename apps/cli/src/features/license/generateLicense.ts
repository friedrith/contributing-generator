import { promises as fs } from 'node:fs'
import path from 'node:path'
import select from '@inquirer/select'
import input from '@inquirer/input'
import * as packageConfig from '../packageConfig'

import * as context from '../../context'
import listLicenseFiles, { getFullPath } from './utils/listLicenseFiles'
import cleanLicenseName from './utils/cleanLicenseName'
import hasProperty from './utils/properties/hasProperty'
import setProperty from './utils/properties/setProperty'
import * as readme from '../readme'
import printTerminal from '../../services/terminal/printTerminal'

const licenseContentInReadme = (license: string) =>
  `This project is licensed under the ${license} License - see the [LICENSE](LICENSE) file for details.`

const generateLicense = async () => {
  context.init()
  const licenses = await listLicenseFiles()

  const licenseFilename = await select({
    message: 'Choose a license:',
    choices: licenses,
    default: getFullPath('mit.txt'),
  })
  const license = cleanLicenseName(path.basename(licenseFilename))

  let licenseContent = await fs.readFile(licenseFilename, 'utf-8')

  const hasYear = hasProperty(licenseContent, 'year')
  if (hasYear) {
    const currentYear = await context.getYear()
    const year = await input({ message: 'Year:', default: currentYear })

    licenseContent = setProperty(licenseContent, 'year', year.toString())
  }

  const hasOrganization = hasProperty(licenseContent, 'organization')
  if (hasOrganization) {
    const { name } = await context.getOrganization()
    const organization = await input({
      message: 'Organization:',
      default: name,
    })

    licenseContent = setProperty(licenseContent, 'organization', organization)
  }

  const hasProject = hasProperty(licenseContent, 'project')
  if (hasProject) {
    const { name } = await context.getProject()
    const project = await input({ message: 'Project:', default: name })

    licenseContent = setProperty(licenseContent, 'project', project)
  }

  const initialPath = await context.getRepositoryPath()
  const repositoryPath = await input({ message: 'Path:', default: initialPath })

  const generatedLicenseFilename = path.join(repositoryPath, 'LICENSE')

  console.log()
  console.log(licenseContent)

  await fs.writeFile(generatedLicenseFilename, licenseContent)
  printTerminal(`License file "${generatedLicenseFilename}" generated`)

  const packageJsonFilename = path.join(repositoryPath, 'package.json')
  try {
    await fs.access(packageJsonFilename)

    const packageJson = await fs.readFile(packageJsonFilename, 'utf-8')

    const { content: newPackageJson, message } = packageConfig.setProperty(
      packageJson,
      'license',
      license
    )

    await fs.writeFile(packageJsonFilename, newPackageJson)
    printTerminal(message)
  } catch (error) {}

  const readmeFilename = path.join(repositoryPath, 'README.md')

  try {
    await fs.access(readmeFilename)

    const readmeContent = await fs.readFile(readmeFilename, 'utf-8')

    const { content: newReadme, message } = readme.setSection(
      readmeContent,
      'License',
      licenseContentInReadme(license)
    )

    await fs.writeFile(readmeFilename, newReadme)
    printTerminal(message)
  } catch (error) {}
}

export default generateLicense
