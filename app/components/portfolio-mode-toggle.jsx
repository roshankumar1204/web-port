import React from "react";

const PortfolioModeToggle = ({ mode, setMode }) => {
  return (
    <div className="w-full flex justify-center items-center py-3">
      <div className="inline-flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${mode === "creative" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"}`}
          onClick={() => setMode("creative")}
        >
          Creative
        </button>
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${mode === "professional" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"}`}
          onClick={() => setMode("professional")}
        >
          Professional
        </button>
      </div>
    </div>
  );
};

export default PortfolioModeToggle;
