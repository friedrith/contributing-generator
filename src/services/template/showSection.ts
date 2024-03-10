const showSection = (content: string, section: string): string => {
  const startSectionRegex = new RegExp(`{{[ ]*\#${section}[ ]*}}`, 'g')
  const endSectionRegex = new RegExp(`{{[ ]*\/${section}[ ]*}}`, 'g')

  return content.replace(startSectionRegex, '').replace(endSectionRegex, '')
}

export default showSection
