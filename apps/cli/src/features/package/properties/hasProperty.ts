const hasProperty = (content: string, name: string) =>
  Boolean(JSON.parse(content).scripts.test)

export default hasProperty
