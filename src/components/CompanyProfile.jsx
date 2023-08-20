import React from "react";

function CompanyProfile() {
  return (
    <div className=" h-full p-6">
      <div className="flex  justify-between  border-b-2 mb-4">
        <h4>Name:</h4>
        <p>Apple Inc</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-4">
        <h4>Exchange:</h4>
        <p>NASDAQ NMS - GLOBAL MARKET</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-4">
        <h4>Country:</h4>
        <p>US</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-4">
        <h4>Currency:</h4>
        <p>USD</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-4">
        <h4>Industry:</h4>
        <p>Technology</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-4">
        <h4>Market Capitalization:</h4>
        {/* remember to conver values */}
        <p>2.7T</p>
      </div>
    </div>
  );
}

export default CompanyProfile;
