// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');


app.post('/api/fetchStockData', async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

  const { symbol, date } = req.body;
  const apiKey = 'lNpBW19LnRi6vda0Kj5Cj652QS2mNJjn'
  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${date}/${date}?apiKey=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'Data not found for the specified stock and date.' });
    }  
    const { o, h, l, c, v } = data.results[0]
    const tradeStats = { open: o, high: h, low: l, close: c, volume: v }
    res.json([tradeStats]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));