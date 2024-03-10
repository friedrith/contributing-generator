const hideSection = (content: string, section: string): string => {
  const sectionRegex = new RegExp(
    `{{[ ]*#${section}[ ]*}}[\\s\\S]*?{{[ ]*/${section}[ ]*}}`,
    'g',
  )
  return content.replace(sectionRegex, '')
}

export default hideSection
