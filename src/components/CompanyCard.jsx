import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import MiniChart from "./MiniChart";
import ThemeContext from "../context/ThemeContext";
// to fix: card is not clickable when user hovers over miniChart
// to fix: some companies siamply dont return full data and their card look empy
// if comapany.price or change or percent is not available, remove from array of peers
// trace how data is used in the big chart, get that same data in this componenet, pass it to minichart
// make sure data gets converted to correct format, and plug in
//todo: if a company does not provide data, and the user clicks on the card, the data of previous company stays
// todo: responsive design for company cards
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
      className={`flex flex-col justify-between border ${
        lightMode
          ? "bg-white border-slate-300 hover:shadow-CardDark"
          : "hover:shadow-CardLight border-slate-800"
      }   
         duration-300 transition-shadow rounded-lg cursor-pointer  h-full w-[200px] lg:w-5/6 mx-2 my-4 lg:my-0`}
      onClick={() => {
        setCompanySymbol(symbol);
      }}
    >
      <div
        className={`bg-gray-500 bg-opacity-20 backdrop-blur-lg ${
          lightMode ? "bg-opacity-100" : null
        }  rounded-tl-lg rounded-tr-lg h-[78px] px-2`}
      >
        <p className={` ${lightMode ? "text-black" : null} text-md py-1`}>
          {data.profile ? data.profile.name : null}
        </p>
        <p className="text-sm text-slate-400">{symbol}</p>
      </div>

      <div className="flex flex-col items-center justify-center h-3/6">
        <p
          className={` font-light text-2xl ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          {/* toFixed raises an error when value returned by api is 0.toFixed(2) */}
          $
          {data.quote && data.quote.c !== null && data.quote.c > 0
            ? data.quote.c.toFixed(2)
            : null}
        </p>
        <div className="flex justify-between w-5/6">
          <p
            className={` ${
              (data.quote ? data.quote.d : null) >= 0
                ? "text-green"
                : "text-red"
            } mr-2`}
          >
            {data.quote && data.quote.d !== null
              ? data.quote.d >= 0
                ? `$${data.quote.d.toFixed(2)}`
                : `-$${Math.abs(data.quote.d).toFixed(2)}`
              : null}
          </p>
          <p
            className={` ${
              (data.quote ? data.quote.dp : null) >= 0
                ? "text-green"
                : "text-red"
            } `}
          >
            {data.quote && data.quote.dp !== null
              ? data.quote.dp.toFixed(2)
              : null}
            %
          </p>
        </div>
      </div>
      {/* make it so that the size of the chart does not impact the size of the div dispalcin everything
      
      solution: fixed div sizes and chart does not o outside or has enough room to be*/}
      <div
        className={`bg-blue-500 flex justify-between bg-grasy-500 bg-opacity-20 backdrop-blur-lg ${
          lightMode ? "bg-opacity-100" : null
        }  rounded-br-lg rounded-bl-lg w-full h-[80px] sm:h-[70px] xl:h-[100px] p-2`}
      >
        <img
          className=" borsder-2 rounded-full"
          src={data.profile ? data.profile.logo : null}
          alt="logo"
        />
        <MiniChart companySymbol={symbol} />
      </div>
    </div>
  );
}

export default CompanyCard;
