import React, { useState, useEffect } from 'react';
const GitHubUserSearch = () => {
  const [username, setUsername] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    if (!searchUser) {
      setUserData(null);
      return;
    }
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.github.com/users/${searchUser}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
    return () => controller.abort();
  }, [searchUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchUser(username.trim());
    }
  };

  const getDeveloperTier = (publicRepos) => {
    if (publicRepos > 50) return 'Active Developer';
    if (publicRepos > 10) return 'Regular Developer';
    return 'Beginner';
  };

  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p>Loading user data...</p>}

        {error && <p style={{ color: 'red' }}> X {error}</p>}

        {userData && !loading && (
          <div className="block">
            <h3>{userData.name || userData.login}</h3>
            <p>Public Repositories: {userData.public_repos}</p>
            <p>Tier: {getDeveloperTier(userData.public_repos)}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default GitHubUserSearch;

// The user enters a GitHub username, and the application fetches user details from the GitHub API.
// 1. Search User
// 2. Fetch User Data
// 3. Display Loading State
// 4. Display User Information
// 5. Error Handling- User Not found
// 6. Conditional Rendering
// Repositories > 50 "Active Developer"

// Repositories > 10 "Regular Developer"
// Otherwise  > "Beginner"
// 7. Cleanup Function
// https://api.github.com/users/${username}
