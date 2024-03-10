const hasProperty = (content: string, property: string) =>
  content.includes(`{{ ${property} }}`);

export default hasProperty;
