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
  // renders live once on input change and once on update
  // bug found: if user continously spams input(which renders and requests) i get error 429 to many req
  //possible fix allow max 4 inputs, no ticker is longer than 4
  //create a var thats an array, add every input, if the length is 4:
  //either let user add more inputs but stop the updatefunction or
  // simply dont add more than 4 inputs
  //todo: only display the logo if the api gives me one, otherwise null to avoid the  missing logo image and alt text

  useEffect(() => {
    updateBestMatches();
  }, [inputValue]);
  console.log("header runns");
  return (
    <div
      className={`flex ${
        lightMode ? "bg-offWhite" : "bg-primary"
      } w-full h-[175px]`}
    >
      <div className="flex flex-col justify-center w-3/6 pl-6">
        <p
          className={`text-4xl text-slate-200 ${
            lightMode ? "text-black" : null
          } pb-4`}
        >
          {data ? data.name : null}
        </p>
        <div className="flex justify-evenly shadow-CardLight items-center border border-slate-400  w-[350px] bg-transparent h-[34px] rounded-lg">
          <input
            type="text"
            name="Company symbol"
            placeholder="Enter company symbol"
            className="w-full h-[34px] outline-none text-white bg-transparent rounded-lg pl-2 text-sm"
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
              className="bg-transparent hover:bg-slate-700 rounded-full mr-2"
            >
              <IoMdClose size={18} />
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
        <div className=" flex items-center justify-center w-2/6 h-4/6">
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
        <div className="flex justify-end w-[100px] h-[100px]  ">
          <img src={data ? data.logo : null} alt="Company logo" />
        </div>
      </div>
    </div>
  );
}

export default Header;
