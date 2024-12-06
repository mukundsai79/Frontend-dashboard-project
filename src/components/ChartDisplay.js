import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";

//THIS NEEDS MORE WORK -- STYLING


const ChartDisplay = ({ profile }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile?.login) return;

    const fetchLangs = async ()  => {
        try{
            setLoading(true);
            setError(false);

            const response = await axios.get(`https://api.github.com/users/${profile.login}/repos`);
            const repos = response.data;

            const langCount = {}; //create object to store number of times language appears
            repos.forEach(repo => {
                if (repo.language && !langCount[repo.language]) {
                    langCount[repo.language] =1;
                }
                else if (langCount[repo.language]) {
                    langCount[repo.language] +=1;
                }
            }) 

            const labels = Object.keys(langCount);
            const data = Object.values(langCount);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Languages",
                        data,

                    },
                ],
            });
        } catch(err) {
            setError("Failed to fetch language data")
        } finally {
            setLoading(false);
        }
    };
        fetchLangs();
  }, [profile]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: "400px", height: "400px", margin: "auto" }}>
        {chartData && <Pie data={chartData} /> }
    </div>
  );
};

export default ChartDisplay;
