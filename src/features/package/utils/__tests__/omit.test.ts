import omit from '../omit'

describe('omit', () => {
  it('should remove property', () => {
    const object = {
      foo: 1,
      bar: 2,
      baz: 3,
    }

    const removed = omit(object, ['bar'])

    expect(removed).toEqual({
      foo: 1,
      baz: 3,
    })
  })

  it('should not remove property', () => {
    const object = {
      foo: 1,
      bar: 2,
      baz: 3,
    }

    const removed = omit(object, ['boo'])

    expect(removed).toEqual(object)
  })

  it('should not remove property when empty keys', () => {
    const object = {
      foo: 1,
      bar: 2,
      baz: 3,
    }

    const removed = omit(object, [])

    expect(removed).toEqual(object)
  })
})
