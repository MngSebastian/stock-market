import React, { useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
function Header({ data, setCompanySymbol }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const clear = () => {
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCompanySymbol(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="flex w-full mb-6 h-[175px]">
      <div className="flex flex-col justify-center w-3/6 pl-6">
        <p className="text-4xl  pb-4">{data ? data.name : null}</p>
        <div className="flex   justify-evenly items-center border-2 w-[350px] bg-transparent h-[45px] rounded-lg">
          <input
            type="text"
            placeholder="Enter company symbol"
            className="w-full h-[40px] outline-none text-white bg-transparent rounded-lg pl-2 text-sm"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {inputValue && (
            <button
              onClick={clear}
              className="bg-slate-500 rounded-full  mr-2 "
            >
              <IoMdClose size={18} />
            </button>
          )}
          <button
            type="submit"
            className=" bg-blue-500 px-2 h-[35px] rounded-lg mr-2"
          >
            <IoMdSearch className="mr-0" />
          </button>
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
