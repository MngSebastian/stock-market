import React, { useState, useEffect, useContext } from "react";
import { fetchQuoteData } from "../utils/api";

import ThemeContext from "../context/ThemeContext";

function CompanyHeader({ companySymbol }) {
  const [data, setData] = useState({});
  const { lightMode, setLightMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchQuoteData(companySymbol, setData);
  }, [companySymbol]);

  return (
    <div className="flex flex-col w-6/6 h-full">
      <div className="w-full">
        <p
          className={` ${
            lightMode ? "text-black" : null
          } flex md:text-sm  lg:text-md xl:text-lg`}
        >
          {companySymbol.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full  h-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <p
            className={`${
              lightMode ? "text-black" : null
            } md:text-lg lg:text-xl xl:text-2xl font-light pb-2`}
          >
            ${data.quote ? data.quote.c.toFixed(2) : null}
          </p>
          <p
            className={`flex justify-around  md:text-lg lg:text-md xl:text-lg w-5/6 ${
              (data.quote ? data.quote.d : null) >= 0
                ? "text-green"
                : "text-red"
            } `}
          >
            <span className="mr-2">
              {data.quote && data.quote.d !== null
                ? data.quote.d >= 0
                  ? `$${data.quote.d.toFixed(2)}`
                  : `-$${Math.abs(data.quote.d).toFixed(2)}`
                : null}
            </span>
            {data.quote && data.quote.dp !== null
              ? data.quote.dp.toFixed(2)
              : null}
            %
          </p>
        </div>
        <div className=" flex justify-center items-center flex-col   w-full">
          <h1
            className={`md:text-lg lg:text-lg xl:text-xl ${
              lightMode ? "text-black" : null
            } pb-2`}
          >
            Day's Range
          </h1>
          <p className="text-md tracking-wider ">
            <span className="bg-red rounded-lg p-1 mr-4 ">
              ${parseFloat(data.quote ? data.quote.l : null).toFixed(2)}
            </span>
            <span className=" bg-green rounded-lg p-1">
              ${parseFloat(data.quote ? data.quote.h : null).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;
