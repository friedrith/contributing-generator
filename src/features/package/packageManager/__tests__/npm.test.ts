import npm from '../npm'

describe('npm', () => {
  describe('getConfigFile', () => {
    it('should return package-lock.yaml', () => {
      expect(npm.getConfigFile()).toBe('package-lock.yaml')
    })
  })

  describe('getCommand', () => {
    it('should return npm install', () => {
      expect(npm.getCommand('install')).toBe('npm install')
    })

    it('should return npm test', () => {
      expect(npm.getCommand('test')).toBe('npm test')
    })

    it('should return npm start', () => {
      expect(npm.getCommand('start')).toBe('npm start')
    })

    it('should return npm run format', () => {
      expect(npm.getCommand('format')).toBe('npm run format')
    })
  })
})
