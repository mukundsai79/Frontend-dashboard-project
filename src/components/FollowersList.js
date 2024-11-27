import React from "react";
import { Table, Avatar } from "evergreen-ui";

const FollowersList = ({ followers }) => {
  return (
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
                <a
                  href={`https://github.com/${follower.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Profile
                </a>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default FollowersList;
