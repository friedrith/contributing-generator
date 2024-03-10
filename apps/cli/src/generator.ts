import select from '@inquirer/select'

import generateLicense from './features/license/generateLicense'
import generateContributing from './features/contributing/generateContributing'
import generateReadme from './features/readme/generateReadme'

const generators = {
  license: generateLicense,
  contributing: generateContributing,
  readme: generateReadme,
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
    console.log('Not implemented yet')
  }
}

export default generator
