import React from "react";
import { Table } from "evergreen-ui";

const RepositoriesList = ({ repo }) => {
  return (
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
              <Table.TextCell>{repository.description || "N/A"}</Table.TextCell>
              <Table.TextCell>
                <a
                  href={repository.html_url}
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

export default RepositoriesList;
