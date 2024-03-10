import setVariable from '../setVariable'

describe('setVariable', () => {
  it('should replace the variable with the value', () => {
    const template = 'foo {{ var }} baz'

    const result = setVariable(template, 'var', 'bar')

    expect(result).toBe('foo bar baz')
  })

  it('should replace the variable with the value when ugly formatted', () => {
    const template = 'foo {{var}} baz'

    const result = setVariable(template, 'var', 'bar')

    expect(result).toBe('foo bar baz')
  })
})
