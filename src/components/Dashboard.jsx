import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import CompanyHeader from "./CompanyHeader";
import CompanyProfile from "./CompanyProfile";
import Chart from "./Chart";
import { fetchCompanyData, apiKey } from "../utils/api";
import SimilarCompanies from "./SimilarCompanies";
import ThemeContext from "../context/ThemeContext";
// todo: handle what happenes when the api does not rreturn data for a specific ticker
function Dashboard() {
  const [data, setData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("TSLA");
  const { lightMode, setLightMode } = useContext(ThemeContext);
  useEffect(() => {
    fetchCompanyData(companySymbol, setData);
  }, [companySymbol]);
  return (
    <div className="flex flex-col h-auto lg:h-full w-full">
      <Header
        setCompanySymbol={setCompanySymbol}
        data={data.profile ? data.profile : null}
      />

      <div
        className={`flex items-center flex-col-reverse lg:flex-row overflow-auto ${
          lightMode ? "bg-offWhite" : "bg-primary"
        } w-full pt-1 pb-4 h-full`}
      >
        <div className="w-4/6 h-full mr-6 ml-6">
          <div
            className={` ${
              lightMode ? "bg-white shadow-dark" : "shadow-light"
            } rounded-lg md:h-[45%] lg:h-[60%] xl:h-4/6 mt-8 mb-10 lg:mb-0 lg:mt-0`}
          >
            <Chart
              apiKey={apiKey}
              companySymbol={companySymbol}
              width={"100%"}
              height={"85%"}
            />
          </div>
          <div className="flex flex-col justify-center lg:justify-end border-2 lg:h-[36%] xl:h-[31%] mt-6">
            <SimilarCompanies
              companySymbol={companySymbol}
              setCompanySymbol={setCompanySymbol}
            />
          </div>
        </div>
        <div className=" flex flex-col justify-between w-4/6 lg:w-2/6 h-full lg:mr-6">
          <div
            className={` ${
              lightMode ? "bg-offWhite shadow-dark" : "shadow-light"
            }  rounded-lg  h-2/6 md:h-[35%] lg:h-[20%] p-2 mb-8 lg:mb-6`}
          >
            <CompanyHeader companySymbol={companySymbol} />
          </div>
          <div className="shadow-custom rounded-lg h-[65%] lg:h-[80%]">
            <CompanyProfile profile={data.profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
