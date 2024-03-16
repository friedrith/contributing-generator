import path from 'node:path'
import { promises as fs } from 'node:fs'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'

import * as context from '../../context'
import getSecurityFilename from './utils/getSecurityFilename'
import getTemplatePath from '../../getTemplatePath'
import setVariable from '../../services/template/setVariable'
import printOutput from '../../services/terminal/printOutput'
import printTerminal from '../../services/terminal/printTerminal'
import * as git from '../../services/git'
import showSection from '../../services/template/showSection'
import hideSection from '../../services/template/hideSection'

const generateSecurity = async () => {
  await context.init()

  const initialPath = getSecurityFilename(await context.getRepositoryPath())
  const securityFilename = await input({
    message: 'Path:',
    default: initialPath,
  })

  const templateFilename = getSecurityFilename(getTemplatePath())

  let templateContent = await fs.readFile(templateFilename, 'utf-8')

  const defaultOrganization = await context.getOrganization()
  const organization = await input({
    message: 'Organization name:',
    default: defaultOrganization.name,
  })
  templateContent = setVariable(templateContent, 'organization', organization)

  const project = await context.getProject()
  const product = await input({
    message: 'Product name:',
    default: project.name,
  })
  templateContent = setVariable(templateContent, 'product', product)

  const defaultSecurityReportingUrl = git.findSecurityReportingUrl(
    await context.getOrganization(),
    await context.getRepository(),
  )

  const showSecurityReporting =
    defaultSecurityReportingUrl ||
    (await confirm({
      message: 'Show security reporting section?',
    }))

  templateContent = showSecurityReporting
    ? showSection(templateContent, 'reporting')
    : hideSection(templateContent, 'reporting')

  if (showSecurityReporting) {
    const securityReportingUrl = await input({
      message: 'Security reporting url:',
      default: defaultSecurityReportingUrl,
    })

    templateContent = setVariable(
      templateContent,
      'reportingUrl',
      securityReportingUrl,
    )
  }

  const showBountySection = await confirm({
    message: 'Show bounty section?',
  })

  templateContent = showBountySection
    ? showSection(templateContent, 'bounty')
    : hideSection(templateContent, 'bounty')

  if (showBountySection) {
    const bountyUrl = await input({ message: 'Bounty platform url:' })

    templateContent = setVariable(templateContent, 'bountyUrl', bountyUrl)
  }

  try {
    await fs.access(securityFilename)

    const overwrite = await confirm({
      message: 'Security file already exists. Overwrite?',
    })

    if (overwrite) {
      await fs.writeFile(securityFilename, templateContent)
      printOutput(templateContent)
      printTerminal('Security file updated')
    }
  } catch (error) {
    await fs.mkdir(path.dirname(securityFilename), { recursive: true })

    await fs.writeFile(securityFilename, templateContent)
    printOutput(templateContent)
    printTerminal('Security file created')
  }
}

export default generateSecurity
