import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function CompanyProfile({ profile }) {
  const { lightMode, setLightMode } = useContext(ThemeContext);

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  const styles = `flex  justify-between  border-b-2 ${
    lightMode ? "border-black" : null
  } mb-6`;

  return (
    <div
      className={`flex  flex-col ${
        lightMode ? "bg-white text-black shadow-dark" : "shadow-light"
      } h-full rounded-lg p-6`}
    >
      <div className={styles}>
        <h4 className="text-lg tracking-widest">Name:</h4>
        <p className="text-lg">{profile ? profile.name : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-lg tracking-widest">Exchange:</h4>
        <p>{profile ? profile.exchange : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-lg tracking-widest">Country:</h4>
        <p>{profile ? profile.country : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-lg tracking-widest">Currency:</h4>
        <p>{profile ? profile.currency : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-lg tracking-widest">Industry:</h4>
        <p>{profile ? profile.finnhubIndustry : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-lg tracking-widest">Market Capitalization:</h4>
        <p>
          {profile
            ? convertMillionToBillion(profile.marketCapitalization)
            : null}
        </p>
      </div>
    </div>
  );
}

export default CompanyProfile;
