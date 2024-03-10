import Organization from "../../types/Organization";
import Repository from "../../types/Repository";

const getGithubOrganizationName = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 404) {
      return username;
    }

    const user: { name?: string } = await response.json();

    return user?.name || username;
  } catch (error) {
    return username;
  }
};

export const isProvider = (url: string) => url.startsWith("git@github.com");

export const getProviderName = () => "github";

export const getIssueTrackerUrl = async (
  organization: Organization,
  repository: Repository,
) => `https://github.com/${organization.username}/${repository.name}/issues`;

export const findOrganization = async (url: string) => {
  const username = url.split(":")[1].split("/")[0];
  return {
    username,
    name: await getGithubOrganizationName(username),
  };
};
