import React from "react";
import { TextInput, Button } from "evergreen-ui";

const SearchBar = ({
  username,
  setUsername,
  setProfile,
  setFollowers,
  setRepo,
  setLoading,
  token,
  loading,
}) => {
  const searchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${username}`
      );
      const data = await res?.json();
      if (data?.items && data.items.length > 0) {
        const userProfile = data.items[0];
        setProfile(userProfile);
        getFollowers(userProfile, token);
        getRepo(userProfile, token);
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
    } finally {
      setLoading(false);
    }
  };

  const getFollowers = async (profile, token) => {
    try {
      const res = await fetch(profile.followers_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res?.json();
      setFollowers(data);
    } catch (e) {
      console.error("Error fetching followers:", e);
    }
  };

  const getRepo = async (profile, token) => {
    try {
      const res = await fetch(profile.repos_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res?.json();
      setRepo(data);
    } catch (e) {
      console.error("Error fetching repositories:", e);
    }
  };

  return (
    <div className="search-bar">
      <label htmlFor="searchToggle">Search:</label>
      <TextInput
        id="searchToggle"
        className="search-input"
        placeholder="Enter GitHub username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <Button
        marginLeft={16}
        appearance="primary"
        onClick={searchProfile}
        isLoading={loading}
        disabled={loading}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
