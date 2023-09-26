import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function CompanyProfile({ profile }) {
  const { lightMode, setLightMode } = useContext(ThemeContext);

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  const styles = `flex  justify-between border-b ${
    lightMode ? "border-black" : null
  } mb-4 lg:mb-8`;

  return (
    <div
      className={`flex font-light flex-col ${
        lightMode ? "bg-white text-black shadow-dark" : "shadow-light"
      } h-full rounded-lg px-10 py-4 lg:py-2 lg:px-6`}
    >
      <div className={styles}>
        <h4 className="text-md lg:text-lg tracking-widest">Name:</h4>
        <p>{profile ? profile.name : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-md lg:text-lg tracking-widest">Exchange:</h4>
        <p>{profile ? profile.exchange : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-md lg:text-lg tracking-widest">Country:</h4>
        <p>{profile ? profile.country : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-md lg:text-lg tracking-widest">Currency:</h4>
        <p>{profile ? profile.currency : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-md lg:text-lg tracking-widest">Industry:</h4>
        <p>{profile ? profile.finnhubIndustry : null}</p>
      </div>
      <div className={styles}>
        <h4 className="text-md lg:text-lg tracking-widest">
          Market Capitalization:
        </h4>
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
