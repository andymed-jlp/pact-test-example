const axios = require('axios');

const fetchQuote = async (API_URL) => {
  const res = await axios.get(`${API_URL}/quote`);
  return res.data[0].text;
};

module.exports = { fetchQuote };
