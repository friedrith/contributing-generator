const getGithubOrganizationName = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (response.status === 404) {
      return username
    }

    const user: { name?: string } = await response.json()

    return user?.name || username
  } catch (error) {
    return username
  }
}

export const findRepositoryInformation = async (url: string) => {
  if (url.startsWith('git@github.com')) {
    const username = url.split(':')[1].split('/')[0]
    return {
      provider: 'github',
      organization: getGithubOrganizationName(username),
    }
  }
  return false
}
