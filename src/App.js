import "./App.css";
import { useState, useMemo } from "react";
import {
  Avatar,
  Button,
  Tab,
  TabNavigation,
  Table,
  TextInput,
} from "evergreen-ui";

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

  const searchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${username}`
      );
      const data = await res?.json();
      if (data?.items && data.items.length > 0) {
        setProfile(data.items[0]);
        getFollowers(data.items[0]);
        getRepo(data.items[0]);
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
    } finally {
      setLoading(false);
    }
  };

  const getFollowers = async (profile) => {
    try {
      const res = await fetch(profile.followers_url);
      const data = await res?.json();
      setFollowers(data);
    } catch (e) {
      console.error("Error fetching followers:", e);
    }
  };

  const getRepo = async (profile) => {
    try {
      const res = await fetch(profile.repos_url);
      const data = await res?.json();
      setRepo(data);
    } catch (e) {
      console.error("Error fetching repositories:", e);
    }
  };

  return (
    <div>
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
          {/* Search Bar */}
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

          <div className="theme-toggle">
            <Button className="theme-button">Dark</Button>
            <Button className="theme-button">Light</Button>
          </div>
        </div>

        {profile?.login && (
          <div style={{ marginTop: 30 }}>
            <Avatar src={profile.avatar_url} name={profile.login} size={40} />
            <h3>{profile.login}</h3>

            <TabNavigation>
              {tabs.map((tab, index) => {
                // const id = tab.toLowerCase().replace(" ", "-");
                return (
                  <Tab
                    key={tab}
                    isSelected={selectedIndex === index}
                    onSelect={() => setSelectedIndex(index)}
                  >
                    {tab}
                  </Tab>
                );
              })}
            </TabNavigation>

            {selectedIndex === 0 && (
              <div>
                <h2>Followers</h2>
                <Table width={800} style={{ margin: "0 auto" }}>
                  <Table.Head>
                    <Table.TextHeaderCell>Avatar</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Username</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Visit</Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body height="auto">
                    {followers?.map((follower) => (
                      <Table.Row key={follower.id}>
                        <Table.TextCell>
                          <Avatar
                            src={follower.avatar_url}
                            name={follower.login}
                            size={40}
                          />
                        </Table.TextCell>
                        <Table.TextCell>{follower.login}</Table.TextCell>
                        <Table.TextCell>
                          <a href={`https://github.com/${follower.login}`}>
                            Visit Profile
                          </a>
                        </Table.TextCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}

            {selectedIndex === 1 && (
              <div>
                <h2>Repositories</h2>
                <Table width={800} style={{ margin: "0 auto" }}>
                  <Table.Head>
                    <Table.TextHeaderCell>Repo Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Description</Table.TextHeaderCell>
                    <Table.TextHeaderCell>View</Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body height="auto">
                    {repo?.map((repository) => (
                      <Table.Row key={repository.id}>
                        <Table.TextCell>{repository.name}</Table.TextCell>
                        <Table.TextCell>
                          {repository.description || "N/A"}
                        </Table.TextCell>
                        <Table.TextCell>
                          <a href={repository.html_url}>View Repo</a>
                        </Table.TextCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
