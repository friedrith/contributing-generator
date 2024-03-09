const setVariable = (content: string, property: string, value: string) =>
  content.replace(new RegExp(`\\{\\{\\s*${property}\\s*\\}\\}`, 'g'), value)

export default setVariable
