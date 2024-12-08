import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import { backgroundColors } from "../utils/chartColors";
import "chart.js/auto";

//This function displays the top 10 starred repos and plots them as bubbles with the size, star number, and forks.
const ScatterDisplay = ({ profile }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile?.login) return;

    const fetchScatterData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://api.github.com/users/${profile.login}/repos`
        );
        const repos = response.data;

        //get top 10 starred repos to avoid a cluttered graph
        const top5Starred = repos
          .filter((repos) => repos.stargazers_count > 0)
          .sort(function (a, b) {
            return b.stargazers_count - a.stargazers_count;
          })
          .slice(0, 5);

        const top5Forked = repos
          .filter((repos) => repos.forks_count > 0)
          .sort(function (a, b) {
            return b.forks_count - a.forks_count;
          })
          .slice(0, 5);

        //combine top 5 forked and top 5 starred into one array with no duplicates
        let merge = new Set([...top5Starred, ...top5Forked]);
        let reposToGraph = [...merge];

        const labels = reposToGraph.map((repo) => repo.name);

        //get the data for the scatter chart
        //x-axis: number of forks
        //y-axis: number of stars
        const data = reposToGraph.map((repo) => ({
          x: repo.forks_count,
          y: repo.stargazers_count,
        }));

        if (data.length > 0) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Forks vs Stars",
                data,
                backgroundColor: backgroundColors,
              },
            ],
          });
        }
        else {
            setChartData(null);
        }
      } catch (err) {
        setError("Failed to fetch scatter data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScatterData();
  }, [profile]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ margin: "auto" }}>
      {chartData ? (
        <Scatter
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Top 10 Starred vs Top 10 Forked Repos",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Forks",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Stars",
                },
              },
            },
          }}
        />
      ) : (
        <div>No starred or forked repositories to display.</div>
      )}
    </div>
  );
};

export default ScatterDisplay;
