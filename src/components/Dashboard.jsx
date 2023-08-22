import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CompanyHeader from "./CompanyHeader";
import CompanyProfile from "./CompanyProfile";
import SimilarCompanies from "./SimilarCompanies";
import Chart from "./Chart";
function Dashboard() {
  const [data, setData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("tsla");
  // const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
  const fetchCompanyData = async () => {
    try {
      const [profileResponse] = await Promise.all([
        axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${companySymbol}&token=${apiKey}`
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
    fetchCompanyData();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <Header logo={data.profile ? data.profile.logo : null} />
      {console.log(data, data)}
      <div className="flex w-full h-full">
        <div className="w-4/6 h-full mr-6">
          <div className="h-4/6">
            <Chart />
          </div>
          {/* <div className="flex border-2 justify-center  h-2/6 pt-6">
            <SimilarCompanies />
          </div> */}
        </div>
        <div className=" flex flex-col justify-between bg-blse-500 w-2/6 h-full">
          <div className="shadow-lg shadow-gray-200 rounded-lg h-1/6 p-2 mr-6">
            <CompanyHeader companySymbol={companySymbol} apiKey={apiKey} />
          </div>
          <div className="shadow-lg shadow-gray-200 rounded-lg h-[80%] mr-6">
            <CompanyProfile profile={data.profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
