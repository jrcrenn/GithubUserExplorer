const GITHUB_API_BASE_URL = 'https://api.github.com';

export async function searchUsers(query: string): Promise<any[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/search/users?q=${query}`);

    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    throw error;
  }
}
