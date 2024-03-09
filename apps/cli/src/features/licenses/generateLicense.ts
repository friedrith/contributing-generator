import { promises as fs } from 'node:fs'
import path from 'node:path'
import select from '@inquirer/select'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import * as packageConfig from '../packageConfig'

import * as context from '../../context'
import listLicenseFiles, { getFullPath } from './listLicenseFiles'
import cleanLicenseName from './cleanLicenseName'
import hasProperty from './properties/hasProperty'

const licenseContentInReadme = (license: string) =>
  `This project is licensed under the ${license} License - see the [LICENSE](LICENSE) file for details.`

const generateLicense = async () => {
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
    const currentYear = new Date().getFullYear().toString()
    const year = await input({ message: 'Year:', default: currentYear })

    licenseContent = setProperty(licenseContent, 'year', year.toString())
  }

  const hasOrganization = hasProperty(licenseContent, 'organization')
  if (hasOrganization) {
    const currentOrganization = await context.getOrganization()
    const organization = await input({
      message: 'Organization:',
      default: currentOrganization,
    })

    licenseContent = setProperty(licenseContent, 'organization', organization)
  }

  const hasProject = hasProperty(licenseContent, 'project')
  if (hasProject) {
    const estimatedProject = (await context.getProject()).name
    const project = await input({
      message: 'Project:',
      default: estimatedProject,
    })

    licenseContent = setProperty(licenseContent, 'project', project)
  }

  const estimatedPath = await context.getRepositoryPath()
  const repositoryPath = await input({
    message: 'Path:',
    default: estimatedPath,
  })

  const generatedLicenseFilename = path.join(repositoryPath, 'LICENSE')

  console.log()
  console.log(licenseContent)

  await fs.writeFile(generatedLicenseFilename, licenseContent)
  console.log(`✔ License file "${generatedLicenseFilename}" generated`)

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
    console.log(`✔ ${message}`)
  } catch (error) {}

  const readmeFilename = path.join(repositoryPath, 'README.md')

  try {
    await fs.access(readmeFilename)

    const readme = await fs.readFile(readmeFilename, 'utf-8')

    const licenseTitle = '## License'

    const indexOfLicense = readme.indexOf(licenseTitle)

    if (indexOfLicense >= 0) {
      const nextTitle = readme.indexOf(
        '##',
        indexOfLicense + licenseTitle.length
      )

      const newReadme = `${readme.slice(
        0,
        indexOfLicense
      )}${licenseTitle}\n\n${licenseContentInReadme(license)}\n\n${readme.slice(
        nextTitle
      )}`

      await fs.writeFile(readmeFilename, newReadme)
      console.log(`✔ License added to README.md`)

      console.log(`✔ License updated in README.md`)
    } else {
      const newReadme = `${readme}\n${licenseTitle}\n\n${licenseContentInReadme(
        license
      )}`

      await fs.writeFile(readmeFilename, newReadme)
      console.log(`✔ License added to README.md`)
    }
  } catch (error) {}
}

export default generateLicense
