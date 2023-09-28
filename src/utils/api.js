import axios from "axios";

export const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */

// TEST ONLY
// export const fetchCompanyData = async (companySymbol, setData) => {
//   try {
//     const [profileResponse, quoteResponse] = await Promise.all([
//       axiosInstance.get(
//         `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
//       ),

//       axiosInstance.get(
//         `https://finnhub.io/api/v1/quote?symbol=${companySymbol}&token=${apiKey}`
//       ),
//     ]);

//     const companyData = {
//       profile: profileResponse.data,
//       quote: quoteResponse.data,
//     };
//     setData(companyData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

export const fetchCompanyData = async (companySymbol, setData) => {
  try {
    const [
      profileResponse,
      //  quoteResponse
    ] = await Promise.all([
      axiosInstance.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
      ),

      // axiosInstance.get(
      //   `https://finnhub.io/api/v1/quote?symbol=${companySymbol}&token=${apiKey}`
      // ),
    ]);

    const companyData = {
      profile: profileResponse.data,
      // quote: quoteResponse.data,
    };
    setData(companyData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchQuoteData = async (companySymbol, setData) => {
  try {
    const quoteResponse = await axiosInstance.get(
      `https://finnhub.io/api/v1/quote`,
      {
        params: { symbol: companySymbol, token: apiKey },
      }
    );
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
    const peersResponse = await axiosInstance.get(
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

let totalReq = 0;
const axiosInstance = axios.create({
  baseURL: "https://finnhub.io/api/v1", // Adjust the base URL accordingly
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  totalReq++;
  // Log the request information
  console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Log the request information
  console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log the remaining requests allowed (if available in response headers)
    const remainingRequests = response.headers["X-Ratelimit-Remaining"];
    console.log(`Remaining Requests: ${remainingRequests}`);
    return response;
  },
  (error) => {
    // Log any errors
    console.error("Request Error:", error);
    throw error;
  }
);
console.log("total reqests", totalReq);

export { axiosInstance };
