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

  const choices = await prompt([
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license:',
      choices: licenses,
      default: 'agpl3-header.txt',
    },
  ])

  const licenseFilename = path.join(TEMPLATES, choices['license'])

  let license = await fs.readFile(licenseFilename, 'utf-8')

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

    license = license.replace(/{{ year }}/g, year.toString())
  }

  const hasOrganization = license.includes('{{ organization }}')

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

    license = license.replace(/{{ organization }}/g, organization.toString())
  }

  const hasProject = license.includes('{{ project }}')

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

    license = license.replace(/{{ project }}/g, project.toString())
  }

  console.log('License file `LICENSE` generated:')
  console.log()
  console.log(license)
}

export default generateLicense
