import Organization from '../Organization'
import buildMock from './buildMock'

const mockOrganization = buildMock<Organization>({
  name: 'mockName',
  username: 'username',
  email: 'foo@bar.com',
})

export default mockOrganization
