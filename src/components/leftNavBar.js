import React, { useEffect, useState } from "react";
import { Avatar } from "evergreen-ui";
import "./leftNavBar.css";
import axios from "axios";

const LeftNavBar = ({ profile }) => {
  const [detailedProfile, setDetailedProfile] = useState(null);
  const [totalForks, setTotalForks] = useState(null);

  const fetchDetailedProfile = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setDetailedProfile(data);
    } catch (e) {
      console.error("Error fetching detailed profile:", e);
    }
  };

  const countForks = async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = await response.json();

      let forkCount = 0;
      repos.forEach((repo) => {
        forkCount += repo.forks_count;
      });

      setTotalForks(forkCount);
    } catch (e) {
      console.error("Failed to fetch fork data", e);
    }
  };

  useEffect(() => {
    if (profile?.login) {
      fetchDetailedProfile(profile.login);
      countForks(profile.login);
    }
  }, [profile]);

  return (
    <div style={{ marginTop: 30 }} className="leftNavBar">
      {detailedProfile ? (
        <>
          <Avatar
            src={detailedProfile.avatar_url}
            name={profile.login}
            size={40}
          />
          <h2 className="username">{detailedProfile.login}</h2>
          <a
            href={detailedProfile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link"
          >
            View Profile
          </a>
          <ul className="profile-stats">
            <li>Repos: {detailedProfile.public_repos}</li>
            <li>Followers: {detailedProfile.followers}</li>
            <li>Following: {detailedProfile.following}</li>
            <li>Forks: {totalForks}</li>
          </ul>
        </>
      ) : (
        <p>Loading profile..</p>
      )}
    </div>
  );
};

export default LeftNavBar;
