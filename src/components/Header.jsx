import React, { useState } from "react";

function Header({ data, setCompanySymbol }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCompanySymbol(inputValue);
    setInputValue("");
  };
  return (
    <div className="flex justify-between w-full mb-6 h-1/6">
      <div className="flex flex-col justify-center w-3/6 p-6">
        <p className="text-4xl pb-4">{data ? data.name : null}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter company symbol"
            className="w-2/6 h-[30px] text-red-500 rounded-lg pl-2 text-sm"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Search
          </button>
        </form>
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
