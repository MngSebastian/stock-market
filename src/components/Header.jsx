import React from "react";

function Header({ data }) {
  return (
    <div className="flex justify-between w-full mb-6 h-1/6">
      <div className="flex flex-col justify-center w-3/6 p-6">
        <p className="text-4xl pb-4">{data ? data.name : null}</p>
        <input
          placeholder="Enter company name or symbol"
          className="w-2/6 h-[30px] rounded-lg pl-2 text-sm"
        />
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
