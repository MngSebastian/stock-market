import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyCard({ item, setCompanySymbol, peers }) {
  const [data, setData] = useState({});
  //   fetch item data and use to display

  const fetchCompanyData = async (item) => {
    try {
      const [profileResponse] = await Promise.all([
        axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${item}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
        ),
      ]);
      const companyData = {
        profile: profileResponse.data,
      };
      setData(companyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCompanyData(item);
  }, [peers, setCompanySymbol]);

  return (
    <div className="flex justify-center bg-yellow-500 w-full">
      <ul
        className="bg-blue-500 cursor-pointer p-4 m-2 w-4/6"
        key={item}
        onClick={() => {
          setCompanySymbol(item);
        }}
      >
        <p className="text-md">{data.profile ? data.profile.name : null}</p>
        <p>{item}</p>
        {console.log("card", data)}
      </ul>
    </div>
  );
}

export default CompanyCard;
