const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/getAccessToken", async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: "Ov23lif5yameOOEsHPcy",
        client_secret: "1f1ec928b73328053558c5d1772cd918a353f74d",
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching access token:", error.response.data);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
