import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function SearchResults({
  results,
  setCompanySymbol,
  setBestMatches,
  setInputValue,
}) {
  const { lightMode } = useContext(ThemeContext);

  return (
    <ul
      className={`absolute top-32 left-4 ${
        lightMode ? "bg-white text-black" : "bg-primary "
      } border-2 custom-scrollbar border-slate-500 w-[300px] md:w-[400px] z-40 rounded-md h-64 overflow-y-scroll`}
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`cursor-pointer ${
              lightMode ? "shadow-light" : "shadow-dark"
            } p-4 m-2  hover:bg-pink-500 flex items-center justify-between rounded-md transition duration-300`}
            onClick={() => {
              setCompanySymbol(item.symbol);
              setInputValue("");
              setBestMatches([]);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
