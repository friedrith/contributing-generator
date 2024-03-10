import getLicenseFilename from '../getLicenseFilename'

describe('getLicenseFilename', () => {
  it('should return the path to the license file', () => {
    const repositoryPath = '/path/to/repo'
    const expectedFilename = '/path/to/repo/LICENSE'

    const filename = getLicenseFilename(repositoryPath)

    expect(filename).toBe(expectedFilename)
  })
})
