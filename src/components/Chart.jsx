import React, { useState, useEffect } from "react";
import { mockHistoricalData } from "../constants/mock";
import { convertUnixTimestampToDate } from "../helpers/date-helper";
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartConfig } from "../constants/chart-config";
import ChartFilter from "./ChartFilter";
import axios from "axios";

function Chart({ apiKey, companySymbol }) {
  const [data, setData] = useState(mockHistoricalData);
  const [dataX, setDataX] = useState([]);

  const [filter, setFilter] = useState("1W");

  const formatData = () => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  const fetchHistoricalData = async () => {
    try {
      const historicalDataResponse = await axios.get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${companySymbol}&resolution=1&from=1679476980&to=1679649780&token=${apiKey}`,
        {
          params: { symbol: companySymbol, token: apiKey },
        }
      );
      const companyData = {
        historicalData: historicalDataResponse.data,
      };
      setDataX(companyData);
      // setIsLoading(false); // Data has been fetched, set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false); // Data has been fetched, set loading to false
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [companySymbol]);

  console.log("historical data", dataX);
  return (
    <div className="h-full">
      <ul className="flex justify-end">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(222,22,210)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(190,12,150)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
