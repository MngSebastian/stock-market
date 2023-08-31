import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyCard({ symbol, setCompanySymbol, peers }) {
  const [data, setData] = useState({});
  //   fetch item data and use to display

  const fetchCompanyData = async (symbol) => {
    try {
      const [
        profileResponse,
        // quoteResponse
      ] = await Promise.all([
        axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
        ),
        // axios.get(
        //   `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
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
      <div className="bg-red-500 px-2">
        <p className="text-md  py-2">
          {data.profile ? data.profile.name : null}
        </p>
        <p className="">{symbol}</p>
      </div>
      <p className=" flex justify-center text-center px-2">
        i want quote data, current price and change%
      </p>
      <div className="flex justify-between bg-gray-500 bg-opacity-20 backdrop-blur-lg  rounded-lg w-full h-[80px]">
        <img
          className="rounded-full w-2/6"
          src={data.profile ? data.profile.logo : null}
          alt="company logo"
        />
        <div className="flex  justify-center  items-center bg-red-500 w-4/6">
          mini-chart
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
