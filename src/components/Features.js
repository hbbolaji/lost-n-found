import React from "react";

const Features = () => {
  const features = [
    "Report Missing Items",
    "RFID-based Sytem",
    "Register Found Items",
    "Search Based System",
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl text-center font-semibold">Features</h1>
      <div className="flex">
        {features.map((feature) => (
          <div key={feature} className="p-6 rounded text-center w-1/4">
            <p className="text-2xl font-semibold text-gray-400">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
