import showSection from "../showSection";

describe("showSection", () => {
  it("should change nothing when the section is not there", () => {
    const template = "Hello World";

    expect(showSection(template, "section")).toBe(template);
  });

  it("should remove section tags", () => {
    const template = "Foo {{#section}}Hello World {{/section}}Bar";
    const withoutSection = "Foo Hello World Bar";

    const content = showSection(template, "section");

    expect(content).toBe(withoutSection);
  });

  it("should remove section with space", () => {
    const template = "Foo {{ #section }}Hello World {{ /section }}Bar";
    const withoutSection = "Foo Hello World Bar";

    const content = showSection(template, "section");

    expect(content).toBe(withoutSection);
  });

  it("should remove only right sections", () => {
    const template =
      "Foo {{#section}}Hello World {{/section}}Bar {{#section}}Hello World {{/section}}Baz";
    const withoutSection = "Foo Hello World Bar Hello World Baz";

    const content = showSection(template, "section");

    expect(content).toBe(withoutSection);
  });
});
