import React from "react";

function CompanyHeader() {
  return (
    <div className="flex bg-vsiolet-500 h-full">
      <div className="bg-red-blue w-3/6">
        <p className="text-xl pb-2">AAPL</p>
        <p className="text-4xl pb-2 pl-20">$179.48</p>
        <p className="text-red-500 text-lg pl-20">-13.39(4.22%)</p>
      </div>
      <div className="flex flex-col  bg-s-500 w-3/6 pl-20 pt-9">
        {/* <p className="border-b-4 border-green-500 w-2/6">$122.24</p> */}
        <h1 className="text-xl pb-4">Day's Range</h1>
        <p className="text-lg font-medium tracking-wider w-3/6">
          <span className="bg-red-500 rounded-lg p-2 mr-4">$171.10</span>
          <span className=" bg-green-500 rounded-lg p-2">$177.28</span>
        </p>
      </div>
    </div>
  );
}

export default CompanyHeader;
