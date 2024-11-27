import React from "react";
import { Avatar } from "evergreen-ui";

const ProfileInfo = ({ profile }) => {
  return (
    <div>
      <Avatar src={profile.avatar_url} name={profile.login} size={40} />
      <h3>{profile.login}</h3>
    </div>
  );
};

export default ProfileInfo;
