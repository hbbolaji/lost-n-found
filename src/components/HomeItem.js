import React from "react";
import { useMissing } from "../context/MissingContext";

const HomeItem = ({ item, dash }) => {
  const { deleteItem } = useMissing();
  return (
    <div className="shadow-lg rounded">
      <div className="h-72 relative">
        <img
          src={item.fileUrl}
          className="w-full h-72 rounded object-cover"
          alt={item.name}
        />
        <div className="absolute top-0 p-4">
          {item.found && (
            <p className="text-white bg-emerald-600 p-2 rounded">Recovered</p>
          )}
          {!item.found && item.founderEmail === "admin@admin.com" && (
            <p className="text-white bg-orange-600 p-2 rounded">With Admin</p>
          )}
          {!item.found && item.founderEmail !== "admin@admin.com" && (
            <p className="text-white bg-red-600 p-2 rounded">Lost</p>
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
      <div className="py-4 flex items-center justify-center p-4 text-sm ">
        {dash ? (
          <button
            onClick={() => deleteItem(item)}
            className="w-full px-4 py-2 bg-red-600 rounded-md text-white"
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HomeItem;
