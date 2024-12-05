import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";

//THIS NEEDS MORE WORK -- NOT FUNCTIONING CORRECTLY
//also updates as user type instead of when search is pressed

const ChartDisplay = ({ username }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLangs = async ()  => {
        try{
            setLoading(true);
            setError(false);

            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            const repos = response.data;

            const langCount = repos.map
/*
            const langCount  = repos.reduce((acc, repo) => { //acc (accumulator) to keep sum of languages
                if (repo.language) {
                    acc[repo.language] = (acc[repo.language] || 0) + 1;
                }
                return acc;
                
            }, {}); */

            /*
            const langCount = {}; //this will count the number of languages in each repo and total them
            await Promise.all(
                repos.map(async (repo) => {
                    if (repo.languages_url) {
                        const langResp = await axios.get(repo.languages_url);
                        const languages = langResp.data;

                        Object.keys(languages).forEach((language) => {
                            langCount[language] = (langCount[language] || 0) + 1;
                        });      
                    } 
                }) 
            
            
            ); */

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
    if (username) {
        fetchLangs();
    }
  }, [username]);
  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: "400px", height: "400px", margin: "auto" }}>
        {chartData && <Pie data={chartData} /> }
    </div>
  );
};

export default ChartDisplay;
