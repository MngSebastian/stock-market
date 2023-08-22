import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyHeader({ companySymbol, apiKey }) {
  const [data, setData] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const fetchQuoteData = async () => {
    try {
      const quoteResponse = await axios.get(`https://finnhub.io/api/v1/quote`, {
        params: { symbol: companySymbol, token: apiKey },
      });
      const companyData = {
        quote: quoteResponse.data,
      };
      setData(companyData);
      // setIsLoading(false); // Data has been fetched, set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false); // Data has been fetched, set loading to false
    }
  };

  useEffect(() => {
    fetchQuoteData();
  }, [companySymbol]);

  // if (isLoading) {
  //   return <p></p>; // Display loading indicator while fetching data
  // }
  return (
    <div className="flex xs:bg-red-500  h-full">
      <div className=" w-3/6">
        <p className="text-xl pb-2">{companySymbol.toUpperCase()}</p>
        <p className="text-4xl pb-2 pl-20">
          {console.log("header data", data.quote ? data.quote.c : null)}$
          {data.quote ? data.quote.c : null}
        </p>
        <p
          className={` text-lg pl-20 ${
            (data.quote ? data.quote.d : null) >= 0
              ? "text-green-500"
              : "text-red-500"
          } `}
        >
          {data.quote ? data.quote.d : null} (
          {data.quote ? data.quote.dp : null}%)
        </p>
      </div>
      <div className="flex flex-col  bg-s-500 w-3/6 pl-20 pt-9">
        {/* <p className="border-b-4 border-green-500 w-2/6">$122.24</p> */}
        <h1 className="text-xl pb-4">Day's Range</h1>
        <p className="text-lg font-medium tracking-wider w-3/6">
          <span className="bg-red-500 rounded-lg p-2 mr-4">
            ${parseFloat(data.quote ? data.quote.l : null).toFixed(2)}
          </span>
          <span className=" bg-green-500 rounded-lg p-2">
            ${parseFloat(data.quote ? data.quote.h : null).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CompanyHeader;
