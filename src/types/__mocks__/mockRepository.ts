import buildMock from './buildMock'
import Repository from '../Repository'

const mockRepository = buildMock<Repository>({
  name: 'mockName',
  provider: 'default',
  remoteOriginUrl: 'https://repository.com/username/project.git',
  path: '/path/to/project',
})

export default mockRepository
