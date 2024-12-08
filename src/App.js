import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import LeftNavBar from "./components/leftNavBar";
import ChartDisplay from "./components/ChartDisplay";
import TopStars from "./components/TopStars";
import ScatterDisplay from "./components/ScatterDisplay";
import SearchBar from "./components/SearchBar";
import FollowersList from "./components/FollowersList";
import FollowingList from "./components/FollowingList";
import RepositoriesList from "./components/RepositoriesList";
import ForksList from "./components/ForksList";
import TabNavigationComponent from "./components/TabNavigationComponent";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);

  const tabs = useMemo(
    () => ["Followers", "Repositories", "Following", "Forks", "Charts"],
    []
  );

  const handleLoginSuccess = async (code) => {
    try {
      const response = await fetch("http://localhost:4000/getAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      const accessToken = data.access_token;
      setToken(accessToken);

      if (accessToken) {
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = await userResponse.json();
        setProfile(userData);
      }
    } catch (error) {
      console.error("OAuth Login Failed", error);
    }
  };

  React.useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleLoginSuccess(code);
    }
  }, [searchParams]);

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
          {!profile.login ? (
            <a
              href={`https://github.com/login/oauth/authorize?client_id=Ov23lif5yameOOEsHPcy&redirect_uri=http://localhost:3000/callback&scope=read:user,user:email`}
              className="search-button"
            >
              Login with GitHub
            </a>
          ) : (
            <SearchBar
              username={username}
              setUsername={setUsername}
              setProfile={setProfile}
              setFollowers={setFollowers}
              setRepo={setRepo}
              setLoading={setLoading}
              token={token} // Pass token
              loading={loading}
            />
          )}
        </div>
      </div>

      <div className="container">
        {profile?.login && (
          <div className="content-wrapper">
            <LeftNavBar profile={profile} token={token} />
            <div style={{ marginTop: 30 }} className="profileTable">
              <TabNavigationComponent
                tabs={tabs}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />

              {selectedIndex === 0 && <FollowersList followers={followers} />}
              {selectedIndex === 1 && <RepositoriesList repo={repo} />}
              {selectedIndex === 2 && <FollowingList following={followers} />}
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
