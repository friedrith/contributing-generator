import hideSection from '../hideSection'

describe('hideSection', () => {
  it('should change nothing when the section is not there', () => {
    const template = 'Hello World'

    expect(hideSection(template, 'section')).toBe(template)
  })

  it('should remove section', () => {
    const template = 'Foo {{#section}}Hello World {{/section}}Bar'
    const withoutSection = 'Foo Bar'

    const content = hideSection(template, 'section')

    expect(content).toBe(withoutSection)
  })

  it('should remove section with space', () => {
    const template = 'Foo {{ #section }}Hello World {{ /section }}Bar'
    const withoutSection = 'Foo Bar'

    const content = hideSection(template, 'section')

    expect(content).toBe(withoutSection)
  })

  it('should remove only right sections', () => {
    const template =
      'Foo {{#section}}Hello World {{/section}}Bar {{#section}}Hello World {{/section}}Baz'
    const withoutSection = 'Foo Bar Baz'

    const content = hideSection(template, 'section')

    expect(content).toBe(withoutSection)
  })
})
