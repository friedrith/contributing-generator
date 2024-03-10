import Organization from '../../types/Organization'
import Repository from '../../types/Repository'

const getGithubOrganization = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (response.status === 404) {
      return {}
    }

    const user: { name?: string; email?: string } = await response.json()

    return {
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    return {}
  }
}

export const isProvider = (url: string) => url.startsWith('git@github.com')

export const getProviderName = () => 'github'

export const getIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository,
) => `https://github.com/${organization.username}/${repository.name}/issues`

export const findOrganization = async (url: string) => {
  const username = url.split(':')[1].split('/')[0]

  const organization = await getGithubOrganization(username)

  return {
    username,
    name: organization?.name ?? username,
    email: organization?.email,
  }
}
