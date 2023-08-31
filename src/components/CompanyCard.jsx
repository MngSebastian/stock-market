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
    <div className="flex justify-center  w-full">
      <ul
        className="border-2 justify-center border-gray-600 hover:border-gray-200 duration-300 rounded-lg cursor-pointer w-5/6 px-2"
        onClick={() => {
          setCompanySymbol(symbol);
        }}
      >
        <p className="text-md bg-rsed-500 pt-2">
          {data.profile ? data.profile.name : null}
        </p>
        <p className="">{symbol}</p>

        <img
          className=" rounded-full"
          src={data.profile ? data.profile.logo : null}
        />
        {/* {console.log("card", data)} */}
      </ul>
    </div>
  );
}

export default CompanyCard;
