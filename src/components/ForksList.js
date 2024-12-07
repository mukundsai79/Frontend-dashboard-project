import React, { useEffect, useState } from "react";
import { Table } from "evergreen-ui";
import axios from "axios";

const ForksList = ({ profile }) => {
  const [forks, setForks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForks = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${profile.login}/repos`
        );
        const forkedRepos = response.data.filter((repo) => repo.fork);
        setForks(forkedRepos);
      } catch (err) {
        setError("Failed to fetch forks.");
      }
    };

    if (profile?.login) {
      fetchForks();
    }
  }, [profile]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Forks</h2>
      <Table width={800} style={{ margin: "0 auto" }}>
        <Table.Head>
          <Table.TextHeaderCell>Repo Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Owner</Table.TextHeaderCell>
          <Table.TextHeaderCell>View</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height="auto">
          {forks?.map((fork) => (
            <Table.Row key={fork.id}>
              <Table.TextCell>{fork.name}</Table.TextCell>
              <Table.TextCell>{fork.owner.login}</Table.TextCell>
              <Table.TextCell>
                <a
                  href={fork.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repo
                </a>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ForksList;
