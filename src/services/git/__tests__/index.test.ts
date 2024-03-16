import mockFetch from '../../__mocks__/mockFetch'
import * as git from '../index'

describe('git', () => {
  describe('findOrganization', () => {
    it('should return github organization', async () => {
      mockFetch('https://api.github.com/users/friedrith', 200, {
        name: 'Thibault Friedrich',
        email: null,
      })
      const url = 'git@github.com:friedrith/contributing-generator.git'

      const organization = await git.findOrganization(url)

      expect(organization).toEqual({
        email: null,
        name: 'Thibault Friedrich',
        username: 'friedrith',
      })
    })

    it('should return gitlab organization', async () => {
      mockFetch('https://gitlab.com/api/v4/users?username=friedrith', 200, [
        {
          name: 'Thibault Friedrich',
          email: null,
        },
      ])
      const url = 'git@gitlab.com:friedrith/contributing-generator.git'

      const organization = await git.findOrganization(url)

      expect(organization).toEqual({
        email: null,
        name: 'Thibault Friedrich',
        username: 'friedrith',
      })
    })

    it('should return default organization', async () => {
      mockFetch('https://api.github.com/users/friedrith', 200, {
        name: 'Thibault Friedrich',
        email: null,
      })
      const url = 'https://repository.com/project/repository.git'

      const organization = await git.findOrganization(url)

      expect(organization).toEqual({
        email: null,
        name: '',
        username: 'project',
      })
    })
  })
})
