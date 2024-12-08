import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { backgroundColors } from "../utils/chartColors";
import "chart.js/auto";
import axios from "axios";
import { countLangs } from "../utils/countLangs";

const ChartDisplay = ({ profile }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile?.login) return;

    const fetchLangs = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://api.github.com/users/${profile.login}/repos`
        );
        const repos = response.data;

        const langCount = countLangs(repos);

        const labels = Object.keys(langCount);
        const data = Object.values(langCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Count",
              data,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (err) {
        setError("Failed to fetch language data ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLangs();
  }, [profile]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ margin: "auto" }}>
      {chartData ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Top Language per Repo",
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

export default ChartDisplay;
