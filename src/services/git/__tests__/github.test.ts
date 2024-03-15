import mockOrganization from '../../../types/__mocks__/mockOrganization'
import mockRepository from '../../../types/__mocks__/mockRepository'
import mockFetch from '../../__mocks__/mockFetch'
import github from '../github'

describe('github', () => {
  describe('isProvider', () => {
    it('should always return false', () => {
      const provider = github.isProvider('foo')

      expect(provider).toEqual(false)
    })

    it('should always return truen with github ssh url', () => {
      const sshUrl = 'git@github.com:friedrith/contributing-generator.git'

      const provider = github.isProvider(sshUrl)

      expect(provider).toEqual(true)
    })

    it('should always return truen with github https url', () => {
      const httpsUrl = 'https://github.com/friedrith/contributing-generator.git'

      const provider = github.isProvider(httpsUrl)

      expect(provider).toEqual(true)
    })
  })

  describe('getProviderName', () => {
    it('should return github', () => {
      const providerName = github.getProviderName()

      expect(providerName).toEqual('github')
    })
  })

  describe('findOrganization', () => {
    it('should return default organization when 404', async () => {
      mockFetch('https://api.github.com/users/friedrith', 404)
      const url = 'git@github.com:friedrith/contributing-generator.git'

      const organization = await github.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: 'friedrith',
        email: undefined,
      })
    })

    it('should return organization with ssh url', async () => {
      mockFetch('https://api.github.com/users/friedrith', 200, {
        name: 'Thibault Friedrich',
        email: null,
      })

      const url = 'git@github.com:friedrith/contributing-generator.git'

      const organization = await github.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: 'Thibault Friedrich',
        email: null,
      })
    })

    it('should return organization with http url', async () => {
      mockFetch('https://api.github.com/users/friedrith', 200, {
        name: 'Thibault Friedrich',
        email: null,
      })

      const url = 'https://github.com/friedrith/contributing-generator.git'

      const organization = await github.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: 'Thibault Friedrich',
        email: null,
      })
    })
  })

  describe('getIssueTrackerUrl', () => {
    it('should return issue tracker url', async () => {
      const organization = mockOrganization({ username: 'foo' })
      const repository = mockRepository({ name: 'bar' })
      const url = await github.getIssueTrackerUrl(organization, repository)

      expect(url).toEqual('https://github.com/foo/bar/issues')
    })
  })

  describe('getRepositoryInformation', () => {
    it('should return empty string when 404', async () => {
      mockFetch('https://api.github.com/repos/username/repo', 404)

      const username = 'username'
      const name = 'repo'
      const repository = await github.getRepositoryInformation(username, name)

      expect(repository).toEqual({})
    })

    it('should return empty string when 404', async () => {
      mockFetch('https://api.github.com/repos/username/repo', 200, {
        description: 'foo',
        topics: ['bar', 'baz'],
      })

      const username = 'username'
      const name = 'repo'
      const repository = await github.getRepositoryInformation(username, name)

      expect(repository).toEqual({
        description: 'foo',
        keywords: ['bar', 'baz'],
      })
    })
  })
})
