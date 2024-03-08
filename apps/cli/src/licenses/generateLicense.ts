import { promises as fs } from 'node:fs'
import path from 'node:path'
import select from '@inquirer/select'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'

import dirname from '../services/dirname'
import * as context from '../context'

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), 'templates')

const cleanLicenseName = (license: string) =>
  license.replace('.txt', '').toUpperCase()

const listLicenses = async () =>
  (await fs.readdir(TEMPLATES))
    .filter(f => f.endsWith('.txt'))
    .map(license => ({ value: license, name: cleanLicenseName(license) }))

const generateLicense = async () => {
  const licenses = await listLicenses()

  const license = await select({
    message: 'Choose a license:',
    choices: licenses,
    default: 'mit.txt',
  })

  const licenseFilename = path.join(TEMPLATES, license)

  let licenseContent = await fs.readFile(licenseFilename, 'utf-8')

  const hasYear = license.includes('{{ year }}')

  if (hasYear) {
    const currentYear = new Date().getFullYear()
    const year = await input({
      message: 'Year:',
      default: currentYear.toString(),
    })

    licenseContent = licenseContent.replace(/{{ year }}/g, year.toString())
  }

  const hasOrganization = licenseContent.includes('{{ organization }}')

  if (hasOrganization) {
    const estimatedOrganization = await context.getOrganization()
    const organization = await input({
      message: 'Organization:',
      default: estimatedOrganization,
    })

    licenseContent = licenseContent.replace(
      /{{ organization }}/g,
      organization.toString()
    )
  }

  const hasProject = licenseContent.includes('{{ project }}')

  if (hasProject) {
    const estimatedProject = (await context.getProject()).name
    const project = await input({
      message: 'Project:',
      default: estimatedProject,
    })

    licenseContent = licenseContent.replace(
      /{{ project }}/g,
      project.toString()
    )
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

    if (packageJson.match('"license": ".*"')) {
      const newPackageJson = packageJson.replace(
        /"license": ".*"/,
        `"license": "${cleanLicenseName(license)}"`
      )

      await fs.writeFile(packageJsonFilename, newPackageJson)
      console.log(`✔ License updated in package.json`)
    } else {
      const indent = packageJson.match(/(.*)"name":/)?.[1] ?? '  '

      const newPackageJson = packageJson.replace(
        /,/,
        `,\n${indent}"license": "${cleanLicenseName(license)}",`
      )

      await fs.writeFile(packageJsonFilename, newPackageJson)
      console.log(`✔ License added to package.json`)
    }
  } catch (error) {}

  const readmeFilename = path.join(repositoryPath, 'README.md')

  try {
    await fs.access(readmeFilename)

    const readme = await fs.readFile(readmeFilename, 'utf-8')

    if (readme.includes('## License')) {
      const newReadme = readme.replace(
        /## License\n\n.*\n/,
        `## License\n\n${licenseContent}\n`
      )

      await fs.writeFile(readmeFilename, newReadme)
      console.log(`✔ License updated in README.md`)
    } else {
      const newReadme = `${readme}\n## License\n\n${licenseContent}`

      await fs.writeFile(readmeFilename, newReadme)
      console.log(`✔ License added to README.md`)
    }
  } catch (error) {}

  const answer = await confirm({ message: 'Continue?' })
}

export default generateLicense
