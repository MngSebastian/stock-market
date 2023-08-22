import React, { useState } from "react";
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

function Chart() {
  const [data, setDate] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W");

  const formatData = () => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };
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
