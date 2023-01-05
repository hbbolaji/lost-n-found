import React from "react";

const HomeItem = ({ item }) => {
  return (
    <div className="shadow-lg rounded">
      <div className="h-72 relative">
        <img
          src={item.fileUrl}
          className="w-full h-72 rounded object-cover"
          alt={item.name}
        />
        <div className="absolute top-0 p-4">
          {item.found ? (
            <p className="text-white bg-emerald-600 p-2 rounded">found</p>
          ) : (
            <p className="text-white bg-red-600 p-2 rounded">missing</p>
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h1 className="text-lg text-center font-semibold">{item.name}</h1>
        <p className="text-center">
          <span className="font-semibold">found by: </span>
          {item.founderEmail}
        </p>
        <p className="text-center font-semibold">Description</p>
        <p className="text-center">{item.description}</p>
      </div>
    </div>
  );
};

export default HomeItem;
