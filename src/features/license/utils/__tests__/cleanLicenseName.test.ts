import cleanLicenseName from '../cleanLicenseName'

describe('cleanLicenseName', () => {
  it('should remove .txt and convert to uppercase', () => {
    expect(cleanLicenseName('mit.txt')).toEqual('MIT')
  })
})
