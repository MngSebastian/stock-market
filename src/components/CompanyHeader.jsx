import React, { useState, useEffect } from "react";
import axios from "axios";
// this component needs to handle fetching data dfor quote prices and such

function CompanyHeader({ companySymbol, apiKey }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchQuoteData = async () => {
    try {
      const quoteResponse = await axios.get(`https://finnhub.io/api/v1/quote`, {
        params: { symbol: companySymbol, token: apiKey },
      });
      console.log("fetched");
      const companyData = {
        quote: quoteResponse.data,
      };
      setData(companyData);
      setIsLoading(false); // Data has been fetched, set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Data has been fetched, set loading to false
    }
  };

  useEffect(() => {
    fetchQuoteData();
  }, []);

  if (isLoading) {
    return <p></p>; // Display loading indicator while fetching data
  }
  return (
    <div className="flex h-full">
      <div className="bg-red-blue w-3/6">
        <p className="text-xl pb-2">{companySymbol.toUpperCase()}</p>
        <p className="text-4xl pb-2 pl-20">${data.quote.c}</p>
        <p
          className={` text-lg pl-20 ${
            data.quote.d >= 0 ? "text-green-500" : "text-red-500"
          } `}
        >
          {data.quote.d} ({data.quote.dp}%)
        </p>
      </div>
      <div className="flex flex-col  bg-s-500 w-3/6 pl-20 pt-9">
        {/* <p className="border-b-4 border-green-500 w-2/6">$122.24</p> */}
        <h1 className="text-xl pb-4">Day's Range</h1>
        <p className="text-lg font-medium tracking-wider w-3/6">
          <span className="bg-red-500 rounded-lg p-2 mr-4">
            ${parseFloat(data.quote.l).toFixed(2)}
          </span>
          <span className=" bg-green-500 rounded-lg p-2">
            ${parseFloat(data.quote.h).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CompanyHeader;

// const fetchCompanyData = async () => {
//   try {
//     const [
//       profileResponse,
//       quoteResponse,
//       recommendationResponse,
//       socialSentimentResponse,
//       companyNewsResponse,
//       // marketNewsResponse,
//     ] = await Promise.all([
//       axios.get(
//         `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
//       ),
//       axios.get(`https://finnhub.io/api/v1/quote`, {
//         params: { symbol: companySymbol, token: apiKey },
//       }),
//       axios.get(
//         `https://finnhub.io/api/v1/stock/recommendation?symbol=${companySymbol}&token=${apiKey}`
//       ),
//       axios.get(
//         `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${companySymbol}&token=${apiKey}`
//       ),

//       axios.get(`https://finnhub.io/api/v1/company-news`, {
//         params: {
//           symbol: companySymbol,
//           // use todays date later
//           from: "2023-08-01",
//           to: "2023-08-01",
//           token: apiKey,
//         },
//       }),
//     ]);

//     const companyData = {
//       profile: profileResponse.data,
//       quote: quoteResponse.data,
//       recommendation: recommendationResponse.data,
//       socialSentiment: socialSentimentResponse,
//       companyNews: companyNewsResponse,
//       // marketNews: marketNewsResponse,
//     };
//     setData(companyData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
