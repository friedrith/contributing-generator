const setSection = (readme: string, title: string, value: string) => {
  const sectionTitle = `## ${title}`;

  const sectionIndex = readme.indexOf(sectionTitle);

  if (sectionIndex >= 0) {
    const nextTitleIndex = readme.indexOf(
      "##",
      sectionIndex + sectionTitle.length,
    );

    const newReadme = `${readme.slice(
      0,
      sectionIndex,
    )}${sectionTitle}\n\n${value}\n\n${readme.slice(nextTitleIndex)}`;

    return {
      content: newReadme,
      message: `${title} updated in README.md`,
    };
  }

  const newReadme = `${readme}\n${sectionTitle}\n\n${value}`;

  return {
    content: newReadme,
    message: `${title} added in README.md`,
  };
};

export default setSection;
