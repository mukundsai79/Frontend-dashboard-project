import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

//Not fully functional - not displaying the data

const TopStars = ({ profile }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile?.login) return;

    const fetchStars = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://api.github.com/users/${profile.login}/repos`
        );
        const repos = response.data;

        const topStars = repos
          .filter((repos) => repos.stargazers_count > 0) //filter out repos that have no stars
          .sort(function (a, b) {
            //sort in descending order
            return b - a;
          })
          .slice(0, 5); //get top 5 highest starred repos

        const labels = topStars.map((repo) => repo.name);
        const numStars = topStars.map((repo) => repo.stargazers_count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Size of Repos",
              numStars,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to get data");
      } finally {
        setLoading(false);
      }
    };
    fetchStars();
  }, [profile]);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Top 5 Starred Repositories",
              },
            },
          }}
        />
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
};

export default TopStars;
