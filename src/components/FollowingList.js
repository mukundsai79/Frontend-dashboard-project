import React from "react";
import { Table, Avatar } from "evergreen-ui";

const FollowingList = ({ following }) => {
  return (
    <div>
      <h2>Following</h2>
      <Table width={800} style={{ margin: "0 auto" }}>
        <Table.Head>
          <Table.TextHeaderCell>Avatar</Table.TextHeaderCell>
          <Table.TextHeaderCell>Username</Table.TextHeaderCell>
          <Table.TextHeaderCell>Visit</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height="auto">
          {following?.map((user) => (
            <Table.Row key={user.id}>
              <Table.TextCell>
                <Avatar src={user.avatar_url} name={user.login} size={40} />
              </Table.TextCell>
              <Table.TextCell>{user.login}</Table.TextCell>
              <Table.TextCell>
                <a
                  href={`https://github.com/${user.login}`}
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

export default FollowingList;
