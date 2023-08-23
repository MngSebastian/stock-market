import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
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
        <p className="text-4xl  pb-4">{data ? data.name : null}</p>
        {/* <div className="flex  items-center bg-red-500 height-[60px]"> */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Enter company symbol"
            className="w-2/6 h-[30px] text-red-500 rounded-lg pl-2 text-sm"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className=" bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <IoMdSearch size={18} className="mr-0" />
          </button>
        </form>
        {/* </div> */}
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
