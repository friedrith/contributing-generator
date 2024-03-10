import getContributingContentInReadme from '../getContributingContentInReadme'

describe('getContributingContentInReadme', () => {
  it('should return the content of the contributing section in the readme', () => {
    expect(getContributingContentInReadme()).toEqual(
      'Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code practices and the process for submitting pull requests.',
    )
  })
})
