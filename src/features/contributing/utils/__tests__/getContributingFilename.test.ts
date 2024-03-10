import getContributingFilename from '../getContributingFilename'

describe('getContributingFilename', () => {
  it('should return the path to the contributing file', () => {
    const repositoryPath = '/path/to/repo'
    const expectedFilename = '/path/to/repo/CONTRIBUTING.md'

    const filename = getContributingFilename(repositoryPath)

    expect(filename).toBe(expectedFilename)
  })
})
