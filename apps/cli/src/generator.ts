import select from '@inquirer/select'

import generateLicense from './features/license/generateLicense'
import generateContributing from './features/contributing/generateContributing'

const generators = {
  license: generateLicense,
  contributing: generateContributing,
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
