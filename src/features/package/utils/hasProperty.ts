const hasProperty = (content: string, name: string) =>
  Boolean(JSON.parse(content).scripts[name]);

export default hasProperty;
