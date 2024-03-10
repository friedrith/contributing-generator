const setProperty = (content: string, name: string, value: string) => {
  if (content.match(`"${name}": ".*"`)) {
    const regex = new RegExp(`"${name}": ".*"`);
    const newContent = content.replace(regex, `"${name}": "${value}"`);

    return {
      content: newContent,
      message: `${name} updated in package.json`,
    };
  }

  const indent = content.match(/(.*)"name":/)?.[1] ?? "  ";

  const newContent = content.replace(/,/, `,\n${indent}"${name}": "${value}",`);

  return {
    content: newContent,
    message: `${name} added to package.json`,
  };
};

export default setProperty;
