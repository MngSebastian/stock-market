import React from "react";

function ChartFilter({ text, active, onClick }) {
  return (
    <button
      className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center 
  cursor-pointer ${
    active
      ? "bg-pink-700 border-gray-700 text-gray-100"
      : "border-indigo-300 text-indigo-300"
  }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
// rgb(222, 22, 210);
export default ChartFilter;
