import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { backgroundColors } from "../utils/chartColors";
import axios from "axios";
import { getTopStarred } from "../utils/getTopStarred";

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

        const topStars = getTopStarred(repos);

        const labels = topStars.map((repo) => repo.name);
        const numStars = topStars.map((repo) => repo.stargazers_count);

        if (numStars.length > 0) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Number of Stars",
                data: numStars,
                backgroundColor: backgroundColors,
              },
            ],
          });
        }
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
    <div style={{ width: "400px", height: "400px", margin: "auto" }}>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            //responsive: true,
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
