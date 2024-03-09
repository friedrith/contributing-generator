const setProperty = (content: string, property: string, value: string) =>
  content.replace(new RegExp(`\\{\\{ ${property} \\}\\}`, 'g'), value)

export default setProperty
