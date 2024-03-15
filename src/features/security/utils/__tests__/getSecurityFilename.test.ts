import getSecurityFilename from '../getSecurityFilename'

describe('getSecurityFilename', () => {
  it('should return the filename', () => {
    const filename = getSecurityFilename('test')

    expect(filename).toBe('test/.github/SECURITY.md')
  })
})
