import React from "react";
import useAuth from "../../hooks/useAuth";

export default function PromoSection() {
  const { darkMode } = useAuth();

  return (
    <div>
      <div
        className={`p-8 max-w-[1440px] mx-auto rounded-lg flex items-center justify-between ${
          darkMode ? "bg-gray-900 text-white" : "bg-black text-white"
        }`}
      >
        {/* Left Section */}
        <div className="space-y-4">
          <p className="text-green-400 font-semibold">Categories</p>
          <h2 className="text-3xl font-bold">Enhance Your Music Experience</h2>

          {/* Countdown Timer */}
          <div className="flex space-x-4 text-center">
            {["Hours", "Days", "Minutes", "Seconds"].map((unit, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg w-16 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              >
                <p className="text-xl font-bold">
                  {["23", "05", "59", "35"][index]}
                </p>
                <p className="text-xs">{unit}</p>
              </div>
            ))}
          </div>

          {/* Buy Now Button */}
          <button className="bg-green-500 px-6 py-2 rounded-md text-white font-bold hover:bg-green-600">
            Buy Now!
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2">
          <img
            src="https://i.ibb.co/5WQ2jJ7g/download-40-removebg-preview.png" // Replace with actual image
            alt="JBL Speaker"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
