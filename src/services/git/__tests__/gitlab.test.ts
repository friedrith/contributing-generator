import mockOrganization from '../../../types/__mocks__/mockOrganization'
import mockRepository from '../../../types/__mocks__/mockRepository'
import mockFetch from '../../__mocks__/mockFetch'
import gitlab from '../gitlab'

describe('gitlab', () => {
  describe('isProvider', () => {
    it('should always return false', () => {
      const provider = gitlab.isProvider('foo')

      expect(provider).toEqual(false)
    })

    it('should always return truen with gitlab ssh url', () => {
      const sshUrl = 'git@gitlab.com:friedrith/contributing-generator.git'

      const provider = gitlab.isProvider(sshUrl)

      expect(provider).toEqual(true)
    })

    it('should always return truen with gitlab https url', () => {
      const httpsUrl = 'https://gitlab.com/friedrith/contributing-generator.git'

      const provider = gitlab.isProvider(httpsUrl)

      expect(provider).toEqual(true)
    })
  })

  describe('getProviderName', () => {
    it('should return gitlab', () => {
      const providerName = gitlab.getProviderName()

      expect(providerName).toEqual('gitlab')
    })
  })

  describe('findOrganization', () => {
    it('should return default organization when 404', async () => {
      mockFetch('https://gitlab.com/api/v4/users?username=friedrith', 404)
      const url = 'git@gitlab.com:friedrith/contributing-generator.git'

      const organization = await gitlab.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: 'friedrith',
        email: undefined,
      })
    })

    it('should return organization with ssh url', async () => {
      mockFetch('https://gitlab.com/api/v4/users?username=friedrith', 200, [
        {
          name: 'Thibault Friedrich',
          email: null,
        },
      ])

      const url = 'git@gitlab.com:friedrith/contributing-generator.git'

      const organization = await gitlab.findOrganization(url)

      expect(organization).toEqual({
        username: 'friedrith',
        name: 'Thibault Friedrich',
        email: null,
      })
    })

    it('should return organization with http url', async () => {
      mockFetch('https://gitlab.com/api/v4/users?username=friedrith', 200, [
        {
          name: 'Thibault Friedrich',
          email: null,
        },
      ])

      const url = 'https://gitlab.com/friedrith/contributing-generator.git'

      const organization = await gitlab.findOrganization(url)

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
      const url = await gitlab.getIssueTrackerUrl(organization, repository)

      expect(url).toEqual('https://gitlab.com/foo/bar/-/issues')
    })
  })

  describe('getRepositoryInformation', () => {
    it('should return empty string when 404', async () => {
      mockFetch('https://gitlab.com/api/v4/users', 404)

      const username = 'username'
      const name = 'repo'
      const repository = await gitlab.getRepositoryInformation(username, name)

      expect(repository).toEqual({})
    })

    it('should return empty string when 404', async () => {
      mockFetch('https://api.gitlab.com/repos/username/repo', 200, {
        description: 'foo',
        topics: ['bar', 'baz'],
      })

      const username = 'username'
      const name = 'repo'
      const repository = await gitlab.getRepositoryInformation(username, name)

      expect(repository).toEqual({})
    })
  })

  describe('getPullRequestTemplateFilename', () => {
    it('should return the path to the pull request template file', () => {
      const repositoryPath = '/path/to/repo'
      const expectedFilename =
        '/path/to/repo/.gitlab/merge_request_templates/TEMPLATE.md'

      const filename = gitlab.getPullRequestTemplateFilename(repositoryPath)

      expect(filename).toBe(expectedFilename)
    })
  })
})
