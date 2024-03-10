const hasProperty = (content: string, property: string) =>
  Boolean(content.match(new RegExp(`{{[ ]*${property}[ ]*}}`)))

export default hasProperty
