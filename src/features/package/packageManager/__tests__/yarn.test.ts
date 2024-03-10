import yarn from '../yarn'

describe('yarn', () => {
  describe('getConfigFile', () => {
    it('should return yarn.lock', () => {
      expect(yarn.getConfigFile()).toBe('yarn.lock')
    })
  })

  describe('getCommand', () => {
    it('should return yarn install', () => {
      expect(yarn.getCommand('install')).toBe('yarn install')
    })

    it('should return yarn test', () => {
      expect(yarn.getCommand('test')).toBe('yarn test')
    })

    it('should return yarn start', () => {
      expect(yarn.getCommand('start')).toBe('yarn start')
    })

    it('should return yarn format', () => {
      expect(yarn.getCommand('format')).toBe('yarn format')
    })
  })
})
