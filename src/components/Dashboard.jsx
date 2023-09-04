import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import CompanyHeader from "./CompanyHeader";
import CompanyProfile from "./CompanyProfile";
import Chart from "./Chart";
import { fetchCompanyData, apiKey } from "../utils/api";
import SimilarCompanies from "./SimilarCompanies";
import ThemeContext from "../context/ThemeContext";

function Dashboard() {
  const [data, setData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("TSLA");
  const { lightMode, setLightMode } = useContext(ThemeContext);
  useEffect(() => {
    fetchCompanyData(companySymbol, setData);
  }, [companySymbol]);
  return (
    <div className="flex flex-col h-full w-full">
      <Header
        setCompanySymbol={setCompanySymbol}
        data={data.profile ? data.profile : null}
      />

      <div
        className={`flex ${
          lightMode ? "bg-offWhite" : "bg-primary"
        } w-full pb-4 h-full`}
      >
        <div className="w-4/6 h-full mr-6 ml-6">
          <div
            className={` ${
              lightMode ? "bg-white shadow-dark" : "shadow-light"
            } rounded-lg h-4/6`}
          >
            <Chart
              apiKey={apiKey}
              companySymbol={companySymbol}
              width={"100%"}
              height={"85%"}
            />
          </div>
          <div className="flex flex-col justify-between h-2/6 mt-8">
            <SimilarCompanies
              companySymbol={companySymbol}
              setCompanySymbol={setCompanySymbol}
            />
          </div>
        </div>
        <div className=" flex flex-col justify-between w-2/6 h-full mr-6">
          <div
            className={`${
              lightMode ? "bg-offWhite shadow-dark" : "shadow-light"
            }  rounded-lg  h-1/6 p-2`}
          >
            <CompanyHeader companySymbol={companySymbol} />
          </div>
          <div className="shadow-custom rounded-lg h-[80%]">
            <CompanyProfile profile={data.profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
