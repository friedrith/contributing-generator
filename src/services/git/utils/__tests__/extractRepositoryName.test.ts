import extractRepositoryName from "../extractRepositoryName";

describe("extractRepositoryName", () => {
  it("should return the repository name", () => {
    const name = extractRepositoryName(
      "git@github.com:friedrith/contributing-generator.git",
    );

    expect(name).toBe("contributing-generator");
  });
});
