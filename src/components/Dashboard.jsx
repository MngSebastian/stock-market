import React, { useState, useEffect } from "react";
import Header from "./Header";
import CompanyHeader from "./CompanyHeader";
import CompanyProfile from "./CompanyProfile";
import Chart from "./Chart";
import { fetchCompanyData, apiKey } from "../utils/api";
import SimilarCompanies from "./SimilarCompanies";
function Dashboard() {
  const [data, setData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("TSLA");
  console.log("dashboard", companySymbol);
  useEffect(() => {
    fetchCompanyData(companySymbol, setData);
  }, [companySymbol]);
  // console.log("ind", data.profile.finnhubIndustry);
  return (
    <div className="flex flex-col h-full w-full">
      <Header
        setCompanySymbol={setCompanySymbol}
        data={data.profile ? data.profile : null}
      />

      <div className="flex w-full  mb-4 h-full">
        <div className="w-4/6 h-full mr-6 ml-6">
          <div className=" shadow-lg h-4/6">
            <Chart apiKey={apiKey} companySymbol={companySymbol} />
          </div>
          <div className="flex justify-center items-center h-2/6">
            <SimilarCompanies
              companySymbol={companySymbol}
              setCompanySymbol={setCompanySymbol}
            />
          </div>
        </div>
        <div className=" flex flex-col justify-between bg-blse-500 w-2/6 h-full mr-6">
          <div className="shadow-lg shadow-gray-200 rounded-lg h-1/6 p-2">
            <CompanyHeader companySymbol={companySymbol} />
          </div>
          <div className="shadow-lg shadow-gray-200 rounded-lg h-[80%]">
            <CompanyProfile profile={data.profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
