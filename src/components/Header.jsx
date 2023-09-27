import React, { useContext, useEffect, useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MoonIcon } from "@heroicons/react/24/outline";
import { searchSymbol } from "../utils/api";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";

function Header({ data, setCompanySymbol }) {
  const [inputValue, setInputValue] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const { lightMode, setLightMode } = useContext(ThemeContext);

  const updateBestMatches = async () => {
    try {
      if (inputValue) {
        const searchResults = await searchSymbol(inputValue);
        const result = searchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  useEffect(() => {
    updateBestMatches();
  }, [inputValue]);

  return (
    <div
      className={`flex  ${
        lightMode ? "bg-offWhite" : "bg-primary"
      } w-full h-[175px]`}
    >
      <div className="flex flex-col justify-center w-3/6 pl-6">
        <p
          className={` lg:text-2xl xl:text-4xl ${
            lightMode ? "text-black" : null
          } pb-4`}
        >
          {data ? data.name : null}
        </p>
        <div className="flex justify-evenly hover:shadow-CardLight items-center border border-slate-400  w-[200px] md:w-[350px] bg-transparent h-[34px] rounded-lg">
          <input
            type="text"
            name="Company symbol"
            maxLength={6}
            placeholder="Enter company symbol"
            className={`w-full h-[34px] outline-none ${
              lightMode ? "text-black" : "text-white"
            } bg-transparent rounded-lg pl-2 text-sm`}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter" && inputValue.length > 0) {
                setCompanySymbol(inputValue.toUpperCase());
                setInputValue("");
              }
            }}
          />
          {inputValue && (
            <button
              onClick={() => {
                setInputValue("");
                setBestMatches([]);
              }}
              className="bg-transparent  mr-2"
            >
              <IoMdClose
                className={` ${
                  lightMode
                    ? "text-black hover:bg-slate-400 rounded-full"
                    : "hover:bg-slate-700 rounded-full"
                }`}
                size={18}
              />
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 px-2 h-[25px] rounded-lg mr-1"
            onClick={() => {
              setCompanySymbol(inputValue);
              setInputValue("");
            }}
          >
            <IoMdSearch size={16} />
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
      <div className="flex justify-end items-center w-3/6 pr-6 ">
        <div className="flex  items-center justify-center w-2/6 h-4/6 pt-10 md:pt-0">
          <button
            onClick={() => {
              setLightMode(!lightMode);
            }}
            className={` flex justify-center items-center border ${
              lightMode
                ? " text-black border border-slate-400 hover:shadow-moonShadowDark"
                : "border-slate-500 hover:shadow-moonShadowLight"
            } rounded-lg   transition duration-300 p-1`}
          >
            {lightMode ? (
              <MoonIcon
                fill="gray"
                color="blue"
                className="h-6 w-6 text-slate-400"
              />
            ) : (
              <MoonIcon fill="yellow" className="h-6 w-6 text-yellow-300" />
            )}
          </button>
        </div>
        <div className="flex justify-end w-[60px] h-[60px] md:w-[80px] md:h-[80px] mt-10 md:mt-0">
          {data && data.logo ? (
            <img src={data.logo} alt="Company logo" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
