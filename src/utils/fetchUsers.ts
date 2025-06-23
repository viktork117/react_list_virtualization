type FetchUsersParams = {
  url?: string;
  query?: string;
  options?: RequestInit;
}

const fetchUsers = async <T>({
  url,
  query,
  options,
}: FetchUsersParams): Promise<T | null> => {
  try {
    const response = await fetch(`${url}?${query}`, options);

    if (!response.ok) throw new Error('Error download files');
    
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default fetchUsers;
