import React from "react";
import { useMissing } from "../context/MissingContext";

const Item = (item) => {
  const { setAsFound } = useMissing();
  return (
    <div className="shadow-lg rounded">
      <div className="h-72 relative">
        <img
          src={item.item.fileUrl}
          className="w-full h-72 rounded object-cover"
          alt={item.item.name}
        />
        <div className="absolute top-0 p-4">
          {item.item.found ? (
            <p className="text-white bg-emerald-600 p-2 rounded">found</p>
          ) : (
            <p className="text-white bg-red-600 p-2 rounded">missing</p>
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h1 className="text-lg text-center font-semibold">{item.item.name}</h1>
        <p className="text-center">
          <span className="font-semibold">found by: </span>
          {item.item.founderEmail}
        </p>
        <p className="text-center font-semibold">Description</p>
        <p className="text-center">{item.item.description}</p>
      </div>
      <div className="py-4 flex items-center justify-between p-4 text-sm ">
        <button className=" px-4 py-2 border text-emerald-600 border-emerald-600 rounded-md text-white">
          Show Details
        </button>
        {item.item.found ? null : (
          <button
            onClick={() => setAsFound({ ...item.item, found: true })}
            className=" px-4 py-2 bg-emerald-600 rounded-md text-white"
          >
            Set Item as Found
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
