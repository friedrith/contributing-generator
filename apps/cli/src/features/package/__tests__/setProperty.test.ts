import setProperty from '../setProperty'

describe('setProperty', () => {
  describe('update property', () => {
    it('should update the value of an existing property when it is last property', () => {
      const content = JSON.stringify(
        {
          name: 'test',
          version: '1.0.0',
          license: 'GPL-3.0',
        },
        null,
        2
      )

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.content).toBe(
        JSON.stringify(
          {
            name: 'test',
            version: '1.0.0',
            license: 'MIT',
          },
          null,
          2
        )
      )
    })

    it('should update the value of an existing property when it is not last property', () => {
      const content = JSON.stringify(
        {
          name: 'test',
          license: 'GPL-3.0',
          version: '1.0.0',
        },
        null,
        2
      )

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.content).toBe(
        JSON.stringify(
          {
            name: 'test',
            license: 'MIT',
            version: '1.0.0',
          },
          null,
          2
        )
      )
    })
  })

  describe('add property', () => {
    it('should add property license', () => {
      const content = JSON.stringify(
        {
          name: 'test',
          version: '1.0.0',
        },
        null,
        2
      )

      const newContent = setProperty(content, 'license', 'MIT')

      expect(newContent.content).toBe(
        JSON.stringify(
          {
            name: 'test',
            license: 'MIT',
            version: '1.0.0',
          },
          null,
          2
        )
      )
    })
  })
})
