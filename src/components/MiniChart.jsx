import React, { useState, useEffect } from "react";
import {
  convertUnixTimestampToDate,
  convertDateToUnixTimestamp,
  createDate,
} from "../helpers/date-helper";

import { AreaChart, Area, YAxis, ResponsiveContainer } from "recharts";
import { chartConfig } from "../constants/chart-config";
import { fetchHistoricalData } from "../utils/api.js";
// take the chart component functions and put them in helper.js
//and request them in chart and minichart component to make them cleaner
function MiniChart({ companySymbol }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };
  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          companySymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [companySymbol, filter]);
  return (
    <div className="flex justify-center items-center w-4/6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area
            className="cursor-pointer"
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="rgb(170,22,190)"
          />
          {/* <XAxis dataKey={"date"} /> */}
          <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MiniChart;
