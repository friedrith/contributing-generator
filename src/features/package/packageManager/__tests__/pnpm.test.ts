import pnpm from '../pnpm'

describe('pnpm', () => {
  describe('getConfigFile', () => {
    it('should return pnpm-lock.yaml', () => {
      expect(pnpm.getConfigFile()).toBe('pnpm-lock.yaml')
    })
  })

  describe('getCommand', () => {
    it('should return pnpm install', () => {
      expect(pnpm.getCommand('install')).toBe('pnpm install')
    })

    it('should return pnpm test', () => {
      expect(pnpm.getCommand('test')).toBe('pnpm test')
    })

    it('should return pnpm start', () => {
      expect(pnpm.getCommand('start')).toBe('pnpm start')
    })

    it('should return pnpm format', () => {
      expect(pnpm.getCommand('format')).toBe('pnpm format')
    })
  })
})
