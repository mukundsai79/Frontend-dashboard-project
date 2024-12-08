import React, { useState, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import ProfileInfo from "./components/ProfileInfo";
import FollowersList from "./components/FollowersList";
import FollowingList from "./components/FollowingList";
import RepositoriesList from "./components/RepositoriesList";
import ForksList from "./components/ForksList";
import TabNavigationComponent from "./components/TabNavigationComponent";
import LeftNavBar from "./components/leftNavBar";
import "./App.css";
import ChartDisplay from "./components/ChartDisplay";
import TopStars from "./components/TopStars";
import ScatterDisplay from "./components/ScatterDisplay";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = useMemo(
    () => ["Followers", "Repositories", "Following", "Forks", "Charts"],
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div className="heading">
        <div className="heading-left">
          <img
            src={`${process.env.PUBLIC_URL}/github_logo.png`}
            alt="GitHub Logo"
            className="logo"
          />
          <span>GitHub API Visualizations</span>
        </div>
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
        </div>
      </div>

      <div className="container">
        {profile?.login && (
          <div className="content-wrapper">
            <LeftNavBar profile={profile} />
            <div style={{ marginTop: 30 }} className="profileTable">
              <TabNavigationComponent
                tabs={tabs}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />

              {selectedIndex === 0 && <FollowersList followers={followers} />}
              {selectedIndex === 1 && <RepositoriesList repo={repo} />}
              {selectedIndex === 2 && <FollowingList following={following} />}
              {selectedIndex === 3 && <ForksList profile={profile} />}
              {selectedIndex === 4 && (
                <div>
                  <h2>Charts</h2>
                  <div style={{ marginTop: 30 }} className="chartsDisplay">
                    <ChartDisplay profile={profile} />
                    <TopStars profile={profile} />
                    <ScatterDisplay profile={profile} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
