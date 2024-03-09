import select from '@inquirer/select'

import generateLicense from './features/licenses/generateLicense'

const generator = async () => {
  const choices = ['license', 'readme', 'contributing'].map(choice => ({
    value: choice,
    label: choice,
  }))

  const option = await select({
    message: 'What do you want to generate?',
    choices,
  })

  if (option === 'license') {
    await generateLicense()
  } else {
    console.log('Not implemented yet')
  }
}

export default generator
