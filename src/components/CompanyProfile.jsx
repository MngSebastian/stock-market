import React from "react";
function CompanyProfile({ profile }) {
  // const [data, setData] = useState({});

  return (
    <div className="flex flex-col justify-evsenly h-full p-6">
      <div className="flex  justify-between  border-b-2 mb-6">
        <h4 className="text-lg tracking-widest">Name:</h4>

        <p className="text-lg">{profile ? profile.name : null}</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-6">
        <h4 className="text-lg tracking-widest">Exchange:</h4>
        <p>{profile ? profile.exchange : null}</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-6">
        <h4 className="text-lg tracking-widest">Country:</h4>
        <p>{profile ? profile.country : null}</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-6">
        <h4 className="text-lg tracking-widest">Currency:</h4>
        <p>{profile ? profile.currency : null}</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-6">
        <h4 className="text-lg tracking-widest">Industry:</h4>
        <p>{profile ? profile.finnhubIndustry : null}</p>
      </div>
      <div className="flex  justify-between  border-b-2 mb-6">
        <h4 className="text-lg tracking-widest">Market Capitalization:</h4>
        {/* remember to conver values */}
        <p>{profile ? profile.marketCapitalization : null}</p>
      </div>
    </div>
  );
}

export default CompanyProfile;
