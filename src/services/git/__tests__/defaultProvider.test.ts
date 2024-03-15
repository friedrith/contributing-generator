import mockOrganization from '../../../types/__mocks__/mockOrganization'
import mockRepository from '../../../types/__mocks__/mockRepository'
import defaultProvider from '../defaultProvider'

describe('defaultProvider', () => {
  describe('isProvider', () => {
    it('should always return true', () => {
      const provider = defaultProvider.isProvider('foo')

      expect(provider).toEqual(true)
    })
  })

  describe('getProviderName', () => {
    it('should return none', () => {
      const providerName = defaultProvider.getProviderName()

      expect(providerName).toEqual('none')
    })
  })

  describe('findOrganization', () => {
    it('should return default organization', async () => {
      const url = 'https://repository.com/username/project.git'

      const organization = await defaultProvider.findOrganization(url)

      expect(organization).toEqual({
        username: '',
        name: '',
        email: null,
      })
    })
  })

  describe('getIssueTrackerUrl', () => {
    it('should return empty string', async () => {
      const organization = mockOrganization()
      const repository = mockRepository()
      const url = await defaultProvider.getIssueTrackerUrl(
        organization,
        repository,
      )

      expect(url).toEqual('')
    })
  })

  describe('getRepositoryInformation', () => {
    it('should return empty object', async () => {
      const username = 'username'
      const name = 'project'
      const repository = await defaultProvider.getRepositoryInformation(
        username,
        name,
      )

      expect(repository).toEqual({})
    })
  })
})
