import select from '@inquirer/select'

import generateLicense from './features/license/generateLicense'
import generateContributing from './features/contributing/generateContributing'
import generateReadme from './features/readme/generateReadme'
import generateCodeOfConduct from './features/codeOfConduct/generateCodeOfConduct'
import generatePullRequestTemplate from './features/pullRequestTemplate/generatePullRequestTemplate'
import generatePackage from './features/package/generatePackage'
import generateSecurity from './features/security/generateSecurity'

const generators = {
  license: generateLicense,
  contributing: generateContributing,
  readme: generateReadme,
  code_of_conduct: generateCodeOfConduct,
  pull_request_template: generatePullRequestTemplate,
  package: generatePackage,
  security: generateSecurity,
  // If you add a new generator, make sure to update the README and the gif following the instructions in the file .docs/README.md
}

const generator = async () => {
  const choices = Object.keys(generators).map(value => ({
    value,
    label: value,
  }))

  const option = await select({
    message: 'What do you want to generate?',
    choices,
  })

  if (option in generators) {
    await generators[option]()
  } else {
    throw new Error('Not implemented yet')
  }
}

export default generator
