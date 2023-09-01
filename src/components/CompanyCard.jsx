import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import MiniChart from "./MiniChart";
import ThemeContext from "../context/ThemeContext";
// to fix: card is not clickable when user hovers over miniChart
// to fix: some companies siamply dont return full data and their card look empy
// if comapany.price or change or percent is not available, remove from array of peers
// trace how data is used in the big chart, get that same data in this componenet, pass it to minichart
// make sure data gets converted to correct format, and plug in
function CompanyCard({ symbol, setCompanySymbol, peers }) {
  const [data, setData] = useState({});
  const { lightMode, setLightMode } = useContext(ThemeContext);

  const fetchProfileAndQuoteData = async (symbol) => {
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
    fetchProfileAndQuoteData(symbol);
  }, [peers]);

  return (
    <div
      className={`flex flex-col justify-between ${
        lightMode ? "bg-white" : null
      } shadow-custom border-gray-600 
        hover:shadow-customHover duration-300 transition-shadow rounded-lg cursor-pointer w-5/6 mx-2`}
      onClick={() => {
        setCompanySymbol(symbol);
      }}
    >
      {/*  bg-gray-500 bg-opacity-20 backdrop-blur-lg  
      rounded-tl-lg rounded-tr-lg is bein used in 2 places, make a variable?*/}
      <div
        className={`bg-gray-500 bg-opacity-20 backdrop-blur-lg ${
          lightMode ? "bg-opacity-100" : null
        }  rounded-tl-lg rounded-tr-lg h-[78px] px-2`}
      >
        <p className="text-md py-1">
          {data.profile ? data.profile.name : null}
        </p>
        <p className="text-sm text-slate-400">{symbol}</p>
      </div>

      <div className="flex flex-col items-center justify-center h-3/6">
        <p className="text-2xl">
          {/* toFixed raises an error when value returned by api is 0.toFixed(2) */}
          {/* {console.log("bigger?", data.quote)}$ */}$
          {data.quote && data.quote.c !== null && data.quote.c > 0
            ? data.quote.c.toFixed(2)
            : null}
        </p>
        <div className="flex justify-between w-5/6">
          <p
            className={` ${
              (data.quote ? data.quote.d : null) >= 0
                ? "text-green-500"
                : "text-red-500"
            } `}
          >
            $
            {data.quote && data.quote.d !== null
              ? data.quote.d.toFixed(2)
              : null}
          </p>
          <p
            className={` ${
              (data.quote ? data.quote.dp : null) >= 0
                ? "text-green-500"
                : "text-red-500"
            } `}
          >
            {/* {data.quote ? data.quote.dp : null}% */}
            {data.quote && data.quote.dp !== null
              ? data.quote.dp.toFixed(2)
              : null}
            %
          </p>
        </div>
      </div>
      <div
        className={`flex justify-between bg-gray-500 bg-opacity-20 backdrop-blur-lg ${
          lightMode ? "bg-opacity-100" : null
        }  rounded-br-lg rounded-bl-lg w-full h-[100px] p-2`}
      >
        <img
          className="rounded-full w-2/6 "
          src={data.profile ? data.profile.logo : null}
          alt="logo"
        />
        <MiniChart companySymbol={symbol} />
      </div>
    </div>
  );
}

export default CompanyCard;
