import axios from "axios";

export const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */

export const fetchCompanyData = async (companySymbol, setData) => {
  try {
    const [profileResponse] = await Promise.all([
      axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
      ),
    ]);
    const companyData = {
      profile: profileResponse.data,
    };
    setData(companyData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchQuoteData = async (companySymbol, setData) => {
  try {
    const quoteResponse = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: { symbol: companySymbol, token: apiKey },
    });
    const companyData = {
      quote: quoteResponse.data,
    };
    setData(companyData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const searchSymbol = async (query) => {
  const url = `https://finnhub.io/api/v1/search?q=${query}&token=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchHistoricalData = async (
  companySymbol,
  resolution,
  from,
  to
) => {
  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${companySymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};
