import React, { useEffect, useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { searchSymbol } from "../utils/api";
import SearchResults from "./SearchResults";

// try to put handleKeyUp and handleSearch in a single function
function Header({ data, setCompanySymbol }) {
  const [inputValue, setInputValue] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const updateBestMatches = async () => {
    try {
      if (inputValue) {
        const searchResults = await searchSymbol(inputValue);
        console.log("searchresults", searchResults);
        const result = searchResults.result;
        setBestMatches(result);
        console.log("searchsymbol", searchResults);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = () => {
    setInputValue("");
    setBestMatches([]);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && inputValue.length > 0) {
      setCompanySymbol(inputValue);
      setInputValue("");
    }
  };

  const handleSearch = () => {
    setCompanySymbol(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    updateBestMatches();
  }, [inputValue]);
  return (
    <div className="flex w-full mb-6 h-[175px]">
      <div className="flex flex-col justify-center w-3/6 pl-6">
        <p className="text-4xl  pb-4">{data ? data.name : null}</p>
        <div className="flex   justify-evenly items-center border-2 w-[350px] bg-transparent h-[34px] rounded-lg">
          <input
            type="text"
            placeholder="Enter company symbol"
            className="w-full h-[34px] bg-red-500 outline-none text-white bg-transparent rounded-lg pl-2 text-sm"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter" && inputValue.length > 0) {
                setCompanySymbol(inputValue);
                setInputValue("");
              }
            }}
          />
          {inputValue && (
            <button
              onClick={clear}
              className="  bg-transparent hover:bg-slate-700 rounded-full  mr-2 "
            >
              <IoMdClose size={16} />
            </button>
          )}
          <button
            type="submit"
            className=" bg-blue-500 px-2 h-[25px] rounded-lg mr-1"
            onClick={handleSearch}
          >
            <IoMdSearch size={18} />
          </button>
          {inputValue && bestMatches.length > 0 ? (
            <SearchResults
              setInputValue={setInputValue}
              setBestMatches={setBestMatches}
              setCompanySymbol={setCompanySymbol}
              results={bestMatches}
            />
          ) : null}
        </div>
      </div>
      <div className="flex justify-end items-center bg-yelslow-500 w-3/6 pr-6">
        <div className=" w-[100px] h-[100px]">
          <img
            className="w-full h-full"
            src={data ? data.logo : null}
            alt="Company logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

// <form onSubmit={handleSubmit} className="flex items-center">
//           <input
//             type="text"
//             placeholder="Enter company symbol"
//             className="w-2/6 h-[30px] text-red-500 rounded-lg pl-2 text-sm"
//             value={inputValue}
//             onChange={handleInputChange}
//           />
//           {inputValue && (
//             <button className="absolute left-72 mt-1 mr-2 text-red-600">
//               x
//             </button>
//           )}

//         </form>
