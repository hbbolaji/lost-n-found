import React, { useEffect } from "react";
import { useMissing } from "../context/MissingContext";
import HomeItem from "./HomeItem";

const Missing = () => {
  const { items, getMissing } = useMissing();
  useEffect(() => {
    getMissing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl text-center font-semibold">All Missing Items</h1>
      <div className="flex flex-wrap px-12">
        {items.map((item) => (
          <div key={item.id} className="w-1/4 p-4">
            <HomeItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missing;
