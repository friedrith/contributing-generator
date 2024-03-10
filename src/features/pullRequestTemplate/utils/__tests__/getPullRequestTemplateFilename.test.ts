import getPullRequestTemplateFilename from '../getPullRequestTemplateFilename'

describe('getPullRequestTemplateFilename', () => {
  it('should return the path to the pull request template file', () => {
    const repositoryPath = '/path/to/repo'
    const expectedFilename = '/path/to/repo/.github/PULL_REQUEST_TEMPLATE.md'

    const filename = getPullRequestTemplateFilename(repositoryPath)

    expect(filename).toBe(expectedFilename)
  })
})
