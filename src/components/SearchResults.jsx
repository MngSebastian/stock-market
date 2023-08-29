import React from "react";
// i want based matches to update in real time
// as the input changes also so that i can give the 'enter' feature back to
// pulling data for a specific ticker

// useEffect that runs everytime the input changes(input==dependency) that calls update matches,
function SearchResults({
  results,
  setCompanySymbol,
  setBestMatches,
  setInputValue,
}) {
  return (
    <ul
      className={`absolute top-32 left-4 bg-primary border-2 custom-scrollbar border-slate-500 w-[400px] z-40 rounded-md h-64 overflow-y-scroll`}
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2  hover:bg-pink-500 flex items-center justify-between rounded-md transition duration-300`}
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
