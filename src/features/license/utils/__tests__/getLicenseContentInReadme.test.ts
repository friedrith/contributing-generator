import getLicenseContentInReadme from '../getLicenseContentInReadme'

describe('getLicenseContentInReadme', () => {
  it('should return the content of the license section in the readme', () => {
    const expectedLicenseContent =
      'This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.'

    const licenseContent = getLicenseContentInReadme('MIT')

    expect(licenseContent).toEqual(expectedLicenseContent)
  })
})
