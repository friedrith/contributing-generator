import mockOrganization from '../../../types/__mocks__/mockOrganization'
import mockRepository from '../../../types/__mocks__/mockRepository'
import mockFetch from '../../__mocks__/mockFetch'
import bitbucket from '../bitbucket'

describe('bitbucket', () => {
  describe('isProvider', () => {
    it('should always return false', () => {
      const provider = bitbucket.isProvider('foo')

      expect(provider).toEqual(false)
    })

    it('should always return truen with bitbucket ssh url', () => {
      const sshUrl = 'git@bitbucket.org:friedrith/contributing-generator.git'

      const provider = bitbucket.isProvider(sshUrl)

      expect(provider).toEqual(true)
    })

    it('should always return truen with bitbucket https url', () => {
      const httpsUrl =
        'https://bitbucket.org/friedrith/contributing-generator.git'

      const provider = bitbucket.isProvider(httpsUrl)

      expect(provider).toEqual(true)
    })
  })

  describe('getProviderName', () => {
    it('should return bitbucket', () => {
      const providerName = bitbucket.getProviderName()

      expect(providerName).toEqual('bitbucket')
    })
  })

  describe('findOrganization', () => {
    it('should return organization with ssh url', async () => {
      const url = 'git@bitbucket.com:friedrith/contributing-generator.git'

      const organization = await bitbucket.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: '',
        email: null,
      })
    })

    it('should return organization with http url', async () => {
      const url = 'https://bitbucket.com/friedrith/contributing-generator.git'

      const organization = await bitbucket.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: '',
        email: null,
      })
    })
  })

  describe('getIssueTrackerUrl', () => {
    it('should return issue tracker url', async () => {
      const organization = mockOrganization({ username: 'foo' })
      const repository = mockRepository({ name: 'bar' })
      const url = await bitbucket.getIssueTrackerUrl(organization, repository)

      expect(url).toEqual('')
    })
  })

  describe('getRepositoryInformation', () => {
    it('should return empty string when 404', async () => {
      mockFetch('https://bitbucket.com/api/v4/users', 404)

      const username = 'username'
      const name = 'repo'
      const repository = await bitbucket.getRepositoryInformation(
        username,
        name,
      )

      expect(repository).toEqual({})
    })

    it('should return empty string when 404', async () => {
      mockFetch('https://api.bitbucket.com/repos/username/repo', 200, {
        description: 'foo',
        topics: ['bar', 'baz'],
      })

      const username = 'username'
      const name = 'repo'
      const repository = await bitbucket.getRepositoryInformation(
        username,
        name,
      )

      expect(repository).toEqual({})
    })
  })

  describe('getPullRequestTemplateFilename', () => {
    it('should return the path to the pull request template file', () => {
      const repositoryPath = '/path/to/repo'
      const expectedFilename = '/path/to/repo/PULL_REQUEST_TEMPLATE.md'

      const filename = bitbucket.getPullRequestTemplateFilename(repositoryPath)

      expect(filename).toBe(expectedFilename)
    })
  })
})
