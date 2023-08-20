import React, { useState, useEffect } from "react";
import axios from "axios";
// import { fetchCompanyProfile } from "../api";
import Header from "./Header";
import CompanyHeader from "./CompanyHeader";
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
    <div className="flex flex-col h-full w-full">
      <Header />
      {console.log(data, data)}
      <div className="flex bg-resd-400 w-full h-full">
        <div className="bg-violet-500 w-4/6 h-full">
          <div className="bg-red-500 h-4/6">for chart</div>
          <p>news and similar companies cards</p>
        </div>
        <div className="bg-bslue-500 w-2/6 h-full">
          <div className="bg-gresen-500 h-1/6 p-2">
            <CompanyHeader />
          </div>
          <div className="bg-cyan-500 h-5/6">company info profile</div>
        </div>
        {/* <button onClick={fetchCompanyData}>fetch comp data</button> */}
      </div>
    </div>
  );
}

export default Dashboard;
