import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyCard({ symbol, setCompanySymbol, peers }) {
  const [data, setData] = useState({});
  //   remember to use toFixed(2) and fix the bug

  const fetchCompanyData = async (symbol) => {
    try {
      const [profileResponse, quoteResponse] = await Promise.all([
        axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
        ),
        axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
        ),
      ]);
      const companyData = {
        profile: profileResponse.data,
        quote: quoteResponse.data,
      };
      setData(companyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCompanyData(symbol);
  }, [peers]);

  return (
    <div
      className="flex flex-col justify-between border-2  border-gray-600 
        hover:border-gray-200 duration-300 rounded-lg cursor-pointer w-5/6 mx-2"
      onClick={() => {
        setCompanySymbol(symbol);
      }}
    >
      <div className="bg-gray-500 bg-opacity-20 backdrop-blur-lg h-[90px] px-2">
        <p className="text-md  py-2">
          {data.profile ? data.profile.name : null}
        </p>
        <p className="">{symbol}</p>
      </div>

      <div className="flex flex-col items-center justify-center h-3/6">
        <p className="text-2xl">
          {/* toFixed raises an error when value returned by api is 0.toFixed(2) */}
          {/* {console.log("bigger?", data.quote)}$ */}$
          {data.quote && data.quote.c > 0 ? data.quote.c.toFixed(2) : null}
        </p>
        <div className="flex justify-between w-5/6">
          <p
            className={` ${
              (data.quote ? data.quote.d : null) >= 0
                ? "text-green-500"
                : "text-red-500"
            } `}
          >
            ${data.quote ? data.quote.d : null}
          </p>
          <p
            className={` ${
              (data.quote ? data.quote.dp : null) >= 0
                ? "text-green-500"
                : "text-red-500"
            } `}
          >
            {data.quote ? data.quote.dp : null}%
          </p>
        </div>
      </div>
      <div className="flex justify-between bg-gray-500 bg-opacity-20 backdrop-blur-lg  rounded-lg w-full h-[100px]">
        <img
          className="rounded-full w-2/6 "
          src={data.profile ? data.profile.logo : null}
          alt="logo"
        />
        <div className="flex  justify-center  items-center bg-resd-500 w-4/6">
          mini-chart
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
