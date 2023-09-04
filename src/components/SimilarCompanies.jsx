import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { fetchPeersData } from "../utils/api";
function SimilarCompanies({ companySymbol, setCompanySymbol }) {
  const [peers, setPeers] = useState(["TSLA", "F", "GM", "RIVN", "LCID"]);

  useEffect(() => {
    fetchPeersData(companySymbol, setPeers);
  }, [companySymbol]);

  return (
    <div className="flex w-full  shadow-dark h-6/6">
      {peers.map((symbol) => {
        return (
          <CompanyCard
            key={symbol}
            symbol={symbol}
            peers={peers}
            setCompanySymbol={setCompanySymbol}
          />
        );
      })}
    </div>
  );
}
export default SimilarCompanies;
