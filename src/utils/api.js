import axios from "axios";

export const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;

/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */

export const fetchCompanyData = async (companySymbol, setData) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
    );

    const companyData = {
      profile: {
        name: response.data.name,
        ticker: response.data.ticker,

        exchange: response.data.exchange,
        country: response.data.country,
        currency: response.data.currency,
        marketCapitalization: response.data.marketCapitalization,

        finnhubIndustry: response.data.finnhubIndustry,

        logo: response.data.logo,
      },
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

export const fetchPeersData = async (companySymbol, setData) => {
  try {
    const peersResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/peers?symbol=${companySymbol}&grouping=industry&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
    );
    // Control how many similar companies you want in the state.
    const peersArray = peersResponse.data.slice(1, 4);

    setData(peersArray);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
