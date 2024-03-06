export const findRepositoryInformation = async (url: string) => {
  if (url.startsWith('git@github.com')) {
    return {
      provider: 'github',
      organization: url.split(':')[1].split('/')[0],
    }
  }
  return false
}
