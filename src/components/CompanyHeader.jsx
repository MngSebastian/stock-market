import React, { useState, useEffect } from "react";
import { fetchQuoteData } from "../utils/api";

function CompanyHeader({ companySymbol }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchQuoteData(companySymbol, setData);
  }, [companySymbol]);

  // figure out how to handle when user inputs giberish for a stocksymbol so i dont get toFixed error
  // if (!data.quote || !data.quote.c) {
  //   return "No data available for the provided symbol.";
  // }
  return (
    <div className="flex bg-gresen-500 w-6/6 h-full">
      <div className="w-3/6">
        <p className=" text-sm lg:text-xl pb-2">
          {companySymbol.toUpperCase()}
        </p>
        <p className="text-sm lg:text-2xl pb-2 pl-20">
          ${data.quote ? data.quote.c : null}
        </p>
        <p
          className={`text-sm md:text-lg pl-20 ${
            (data.quote ? data.quote.d : null) >= 0
              ? "text-green-500"
              : "text-red-500"
          } `}
        >
          {/* {data.quote ? data.quote.d : null} ( */}
          {data.quote ? `${data.quote.dp.toFixed(2)}%` : null}%
        </p>
      </div>
      <div className="flex flex-col w-3/6 pl-20 pt-9">
        <h1 className="text-xl pb-2">Day's Range</h1>
        <p className="text-lg font-medium tracking-wider w-3/6">
          <span className="bg-red-500 rounded-lg p-1 mr-4">
            {/* ${data.quote ? parseFloat(data.quote.l).toFixed(2) : null} */}$
            {parseFloat(data.quote ? data.quote.l : null).toFixed(2)}
          </span>
          <span className=" bg-green-500 rounded-lg p-1">
            {/* ${data.quote ? parseFloat(data.quote.h).toFixed(2) : null} */}$
            {parseFloat(data.quote ? data.quote.h : null).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CompanyHeader;
