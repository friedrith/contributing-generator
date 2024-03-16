import hasDomain from '../hasDomain'

describe('hasDomain', () => {
  it('should return true when domain is present as ssh url', () => {
    const url = 'git@github.com:friedrith/contributing-generator.git'

    expect(hasDomain('github.com', url)).toEqual(true)
  })

  it('should return false when domain is not present as ssh url', () => {
    const url = 'git@github.com:friedrith/contributing-generator.git'

    expect(hasDomain('gitlab.com', url)).toEqual(false)
  })

  it('should return true when domain is present as https url', () => {
    const url = 'https://github.com/friedrith/contributing-generator.git'

    expect(hasDomain('github.com', url)).toEqual(true)
  })

  it('should return false when domain is not present as https url', () => {
    const url = 'https://github.com/friedrith/contributing-generator.git'

    expect(hasDomain('gitlab.com', url)).toEqual(false)
  })
})
