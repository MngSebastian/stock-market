import React, { useEffect, useState } from "react";
import { fetchPeersData } from "../utils/api";
import CompanyCard from "./CompanyCard";
function SimilarCompanies({ companySymbol, setCompanySymbol }) {
  const [peers, setPeers] = useState(["TSLA", "F", "GM", "RIVN", "LCID"]);

  // useEffect(() => {
  //   fetchPeersData(companySymbol, setPeers);
  // }, [companySymbol]);
  return (
    <div className="flex w-full h-5/6 ">
      {peers.map((item) => {
        return (
          <CompanyCard
            item={item}
            peers={peers}
            setCompanySymbol={setCompanySymbol}
          />
        );
      })}
    </div>
  );
}
export default SimilarCompanies;
