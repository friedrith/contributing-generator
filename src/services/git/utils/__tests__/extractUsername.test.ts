import extractUsername from '../extractUsername'

describe('extractUsername', () => {
  it('should return username from https url', async () => {
    const url = 'https://github.com/friedrith/contributing-generator.git'

    const username = extractUsername(url)

    expect(username).toEqual('friedrith')
  })

  it('should return username from ssh url', async () => {
    const url = 'git@github.com:friedrith/contributing-generator.git'

    const username = extractUsername(url)

    expect(username).toEqual('friedrith')
  })
})
