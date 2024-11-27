import React, { useState, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import ProfileInfo from "./components/ProfileInfo";
import FollowersList from "./components/FollowersList";
import RepositoriesList from "./components/RepositoriesList";
import TabNavigationComponent from "./components/TabNavigationComponent";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = useMemo(
    () => ["Followers", "Repositories", "Following", "Forks"],
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div className="heading">
        <img
          src={`${process.env.PUBLIC_URL}/github_logo.png`}
          alt="GitHub Logo"
          className="logo"
        />
        <span>GitHub API Visualizations</span>
      </div>

      <div className="container">
        <div className="search-theme-container">
          <SearchBar
            username={username}
            setUsername={setUsername}
            setProfile={setProfile}
            setFollowers={setFollowers}
            setRepo={setRepo}
            setLoading={setLoading}
            loading={loading}
          />
          <ThemeToggle />
        </div>

        {profile?.login && (
          <div style={{ marginTop: 30 }}>
            <ProfileInfo profile={profile} />

            <TabNavigationComponent
              tabs={tabs}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />

            {selectedIndex === 0 && <FollowersList followers={followers} />}
            {selectedIndex === 1 && <RepositoriesList repo={repo} />}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
