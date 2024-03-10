const extractRepositoryName = (url: string) => url.match(/([^/]+)\.git/)?.[1]

export default extractRepositoryName
