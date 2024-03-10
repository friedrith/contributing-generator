import getPackageConfigFilename from '../getPackageConfigFilename'

describe('getPackageConfigFilename', () => {
  it('should return the package.json path', () => {
    const repositoryPath = '/path/to/repository'
    const expectedFilename = '/path/to/repository/package.json'

    expect(getPackageConfigFilename(repositoryPath)).toBe(expectedFilename)
  })
})
