import { promises as fs } from 'node:fs'
import path from 'node:path'
import inquirer from 'inquirer'

const TEMPLATES = 'templates'

const cleanLicenseName = (license: string) =>
  license.replace('.txt', '').toUpperCase()

const listLicenses = async () => {
  const licenses = await fs.readdir('./templates')

  return licenses.map(license => ({
    value: license,
    name: cleanLicenseName(license),
  }))
}

const generateLicense = async () => {
  const licenses = await listLicenses()

  console.log(licenses)

  await inquirer.prompt([
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license:',
      choices: licenses,
    },
  ])
}

export default generateLicense
