import React from "react";

function ChartFilter({ text, active, onClick }) {
  return (
    <button
      className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center 
  cursor-pointer ${
    active
      ? "bg-pinkDark border-gray-700 text-gray-100"
      : "border-indigo-300 text-indigo-300"
  }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
export default ChartFilter;
