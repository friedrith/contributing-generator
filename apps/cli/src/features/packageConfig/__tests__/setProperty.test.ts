import setProperty from '../properties/setProperty'

const formattedContent = (content: object) => JSON.stringify(content, null, 2)

describe('setProperty', () => {
  describe('update property', () => {
    it('should update the value of an existing property when it is last property', () => {
      const content = formattedContent({
        name: 'test',
        version: '1.0.0',
        license: 'GPL-3.0',
      })

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.content).toBe(
        formattedContent({
          name: 'test',
          version: '1.0.0',
          license: 'MIT',
        })
      )
    })

    it('should update the value of an existing property when it is not last property', () => {
      const content = formattedContent({
        name: 'test',
        license: 'GPL-3.0',
        version: '1.0.0',
      })

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.content).toBe(
        formattedContent({
          name: 'test',
          license: 'MIT',
          version: '1.0.0',
        })
      )
    })

    it('should return updated message', () => {
      const content = formattedContent({
        name: 'test',
        license: 'GPL-3.0',
        version: '1.0.0',
      })

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.message).toBe('license updated in package.json')
    })
  })

  describe('add property', () => {
    it('should add property license', () => {
      const content = formattedContent({
        name: 'test',
        version: '1.0.0',
      })

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.content).toBe(
        formattedContent({
          name: 'test',
          license: 'MIT',
          version: '1.0.0',
        })
      )
    })

    it('should return added message', () => {
      const content = formattedContent({
        name: 'test',
        version: '1.0.0',
      })

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.message).toBe('license added to package.json')
    })
  })
})
