import React, { useEffect, useState } from "react";
import { fetchPeersData } from "../utils/api";

function SimilarCompanies({ companySymbol, setCompanySymbol }) {
  const [data, setData] = useState(["AAPL", "DELL", "HPQ", "1337.HK", "HPE"]);
  useEffect(() => {
    fetchPeersData(companySymbol, setData);
  }, [companySymbol]);
  return (
    <div className="flex justify-center w-full h-5/6">
      {/* {console.log("similar comp", data)} */}
      {data.map((item) => {
        return (
          <ul
            className="bg-blue-500 cursor-pointer p-4 m-2 w-4/6"
            key={item}
            onClick={() => {
              console.log("use effcet", item);
              setCompanySymbol(item);
            }}
          >
            {item}
          </ul>
        );
      })}
    </div>
  );
}

export default SimilarCompanies;
