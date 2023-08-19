import React, { useState, useEffect } from "react";
import axios from "axios";
// import { fetchCompanyProfile } from "../api";

function Dashboard() {
  const [data, setData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("aapl");
  const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;

  const fetchCompanyData = async () => {
    try {
      const [
        profileResponse,
        quoteResponse,
        recommendationResponse,
        socialSentimentResponse,
        companyNewsResponse,
        // marketNewsResponse,
      ] = await Promise.all([
        axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
        ),
        axios.get(`https://finnhub.io/api/v1/quote`, {
          params: { symbol: companySymbol, token: apiKey },
        }),
        axios.get(
          `https://finnhub.io/api/v1/stock/recommendation?symbol=${companySymbol}&token=${apiKey}`
        ),
        axios.get(
          `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${companySymbol}&token=${apiKey}`
        ),

        axios.get(`https://finnhub.io/api/v1/company-news`, {
          params: {
            // make symbol dinamic
            symbol: companySymbol,
            // use todays date later
            from: "2023-08-01",
            to: "2023-08-01",
            token: apiKey,
          },
        }),
      ]);

      const companyData = {
        profile: profileResponse.data,
        quote: quoteResponse.data,
        recommendation: recommendationResponse.data,
        socialSentiment: socialSentimentResponse,
        companyNews: companyNewsResponse,
        // marketNews: marketNewsResponse,
      };
      setData(companyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <button className="border-2" onClick={fetchCompanyData}>
        Fetch Company Data
      </button>
      {console.log("data", data)}
      {/* {console.log("compdata", companyEarningsResponse[0])} */}

      <div>
        {data.quote ? (
          <div>
            <p>Price: {data.quote.c}</p>
            <p>Change since previous closing price: {data.quote.d}</p>
            <p>Lowest Price of the day: {data.quote.l}</p>
            <p>Highest Priceof the day: {data.quote.h}</p>
            <p>Opening Price of the day: {data.quote.o}</p>
            <p>Price: {data.quote.c}</p>
            <p>Previous close Price: {data.quote.pc}</p>
            <p>Percent change: {data.quote.dp}%</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
