import getCodeOfConductFilename from '../getCodeOfConductFilename'

describe('getCodeOfConductFilename', () => {
  it('returns the path to the code of conduct file', () => {
    const repositoryPath = '/path/to/repo'
    const expectedFilename = '/path/to/repo/CODE_OF_CONDUCT.md'

    const filename = getCodeOfConductFilename(repositoryPath)

    expect(filename).toBe(expectedFilename)
  })
})
