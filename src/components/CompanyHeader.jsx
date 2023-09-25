import React, { useState, useEffect, useContext } from "react";
import { fetchQuoteData } from "../utils/api";
import ThemeContext from "../context/ThemeContext";
//todo: make a variable for the green/red color so i dont repeat the same code
function CompanyHeader({ companySymbol }) {
  const [data, setData] = useState({});
  const { lightMode, setLightMode } = useContext(ThemeContext);
  useEffect(() => {
    fetchQuoteData(companySymbol, setData);
  }, [companySymbol]);
  //todo: find a responsive solution for symbol in the left corner

  // figure out how to handle when user inputs giberish for a stocksymbol so i dont get toFixed error
  // return message rather than error on unknown input
  // if (!data.quote || !data.quote.c) {
  //   return "No data available for the provided symbol.";
  // }
  return (
    <div className="flex flex-col  w-6/6 h-full">
      <div className="w-full">
        <p className=" flex md:text-sm lg:text-md">
          {companySymbol.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full  h-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <p className="text-sm lg:text-2xl font-light pb-2">
            ${data.quote ? data.quote.c : null}
          </p>
          <p
            className={`flex justify-around text-sm md:text-lg w-4/6 ${
              (data.quote ? data.quote.d : null) >= 0
                ? "text-green"
                : "text-red"
            } `}
          >
            {/* add plus sign if number is positive */}
            {/* toFixed(2)  will probably raise an error when quote.dp is 0 */}
            <span>
              $
              {data.quote && data.quote.d !== null
                ? data.quote.d.toFixed(2)
                : null}
            </span>
            {data.quote && data.quote.dp !== null
              ? data.quote.dp.toFixed(2)
              : null}
            %
          </p>
        </div>
        <div className=" flex justify-center items-center flex-col   w-full">
          <h1 className={`text-xl ${lightMode ? "text-black" : null} pb-2`}>
            Day's Range
          </h1>
          <p className="text-md tracking-wider ">
            <span className="bg-red rounded-lg p-1 mr-4 ">
              {/* ${data.quote ? parseFloat(data.quote.l).toFixed(2) : null} */}
              ${parseFloat(data.quote ? data.quote.l : null).toFixed(2)}
            </span>
            <span className=" bg-green rounded-lg p-1">
              {/* ${data.quote ? parseFloat(data.quote.h).toFixed(2) : null} */}
              ${parseFloat(data.quote ? data.quote.h : null).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;

{
  /* <div
        className={`   ${
          lightMode ? "text-black" : null
        } flex flex-col items-center w-3/6`}
      > */
}
// <div className="flex  w-full">
//   <p className=" flex text-md">{companySymbol.toUpperCase()}</p>
// </div>
// <p className="text-sm lg:text-2xl font-light pb-2">
//   ${data.quote ? data.quote.c : null}
// </p>
// <p
//   className={`flex justify-around text-sm md:text-lg w-4/6 ${
//     (data.quote ? data.quote.d : null) >= 0 ? "text-green" : "text-red"
//   } `}
// >
//   {/* add plus sign if number is positive */}
//   {/* toFixed(2)  will probably raise an error when quote.dp is 0 */}
//   <span>
//     $
//     {data.quote && data.quote.d !== null
//       ? data.quote.d.toFixed(2)
//       : null}
//   </span>
//   {data.quote && data.quote.dp !== null
//     ? data.quote.dp.toFixed(2)
//     : null}
//   %
// </p>
// </div>
