import hasProperty from '../hasProperty'

describe('hasProperty', () => {
  it('should return true', () => {
    const content = 'foo {{var}} bar'

    expect(hasProperty(content, 'var')).toBe(true)
  })

  it('should return true when template has space', () => {
    const content = 'foo {{ var }} bar'

    expect(hasProperty(content, 'var')).toBe(true)
  })

  it('should return false when no variable', () => {
    const content = 'foo bar'

    expect(hasProperty(content, 'var')).toBe(false)
  })

  it('should return false when variable with wrong name', () => {
    const content = 'foo {{var2}} bar'

    expect(hasProperty(content, 'var')).toBe(false)
  })
})
