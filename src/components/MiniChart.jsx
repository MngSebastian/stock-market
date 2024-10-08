import React, { useState, useEffect } from "react";
import {
  convertUnixTimestampToDate,
  convertDateToUnixTimestamp,
  createDate,
} from "../helpers/date-helper";
import { AreaChart, Area, YAxis, ResponsiveContainer } from "recharts";
import { chartConfig } from "../constants/chart-config";
import { fetchHistoricalData } from "../utils/api.js";

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
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="55%"
                stopColor="rgb(222,22,210)"
                stopOpacity={0.8}
              />
              <stop
                offset="98%"
                stopColor="rgb(190,12,150)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            className="cursor-pointer"
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={0.8}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          {/* <XAxis dataKey={"date"} /> */}
          <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MiniChart;
