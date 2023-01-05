import React from "react";
import Item from "./Item";

const MissingList = ({ items }) => {
  return (
    <div className="flex flex-wrap px-24 w-full">
      {items?.map((item, index) => (
        <div key={item.id} className="p-4 w-1/4">
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

export default MissingList;
