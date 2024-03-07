import { promises as fs } from 'node:fs'
import path from 'node:path'
import inquirer from 'inquirer'
import dirname from '../services/dirname'
import * as context from '../context'

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), 'templates')

const prompt = inquirer.createPromptModule()

const cleanLicenseName = (license: string) =>
  license.replace('.txt', '').toUpperCase()

const listLicenses = async () => {
  const licenses = await fs.readdir(TEMPLATES)

  return licenses
    .filter(f => f.endsWith('.txt'))
    .map(license => ({
      value: license,
      name: cleanLicenseName(license),
    }))
}

const generateLicense = async () => {
  const licenses = await listLicenses()

  const { license } = await prompt([
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license:',
      choices: licenses,
      default: 'agpl3-header.txt',
    },
  ])

  const licenseFilename = path.join(TEMPLATES, license)

  let licenseContent = await fs.readFile(licenseFilename, 'utf-8')

  const hasYear = license.includes('{{ year }}')

  if (hasYear) {
    const currentYear = new Date().getFullYear()
    const { year } = await prompt([
      {
        type: 'input',
        name: 'year',
        message: 'Year:',
        default: currentYear,
      },
    ])

    licenseContent = licenseContent.replace(/{{ year }}/g, year.toString())
  }

  const hasOrganization = licenseContent.includes('{{ organization }}')

  if (hasOrganization) {
    const estimatedOrganization = await context.getOrganization()
    const { organization } = await prompt([
      {
        type: 'input',
        name: 'organization',
        message: 'Organization:',
        default: estimatedOrganization,
      },
    ])

    licenseContent = licenseContent.replace(
      /{{ organization }}/g,
      organization.toString()
    )
  }

  const hasProject = licenseContent.includes('{{ project }}')

  if (hasProject) {
    const estimatedProject = (await context.getProject()).name
    const { project } = await prompt([
      {
        type: 'input',
        name: 'project',
        message: 'Project:',
        default: estimatedProject,
      },
    ])

    licenseContent = licenseContent.replace(
      /{{ project }}/g,
      project.toString()
    )
  }

  const estimatedPath = await context.getRepositoryPath()
  const { repositoryPath } = await prompt([
    {
      type: 'input',
      name: 'repositoryPath',
      message: 'Path:',
      default: estimatedPath,
    },
  ])

  const generatedLicenseFilename = path.join(repositoryPath, 'LICENSE')

  console.log()
  console.log(licenseContent)

  await fs.writeFile(generatedLicenseFilename, licenseContent)
  console.log(`✔ License file "${generatedLicenseFilename}" generated`)

  const packageJsonFilename = path.join(repositoryPath, 'package.json')
  let foundPackageJson = false
  try {
    await fs.access(packageJsonFilename)
    foundPackageJson = true
  } catch (error) {}

  if (foundPackageJson) {
    const packageJson = await fs.readFile(packageJsonFilename, 'utf-8')

    if (packageJson.includes('"license": "ISC"')) {
      const newPackageJson = packageJson.replace(
        '"license": "ISC"',
        `"license": "${cleanLicenseName(license)}"`
      )

      await fs.writeFile(packageJsonFilename, newPackageJson)
      console.log(`✔ package.json updated`)
    }
  }

  console.log(`✔ License file "${generatedLicenseFilename}" generated`)
}

export default generateLicense
