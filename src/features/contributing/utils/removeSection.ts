const removeSection = (content: string, section: string) =>
  content.replace(new RegExp(`\\{\\{ ${section} \\}\\}`, "g"), "");

export default removeSection;
