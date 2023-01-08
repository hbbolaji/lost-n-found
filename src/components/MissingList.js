import React from "react";
import Item from "./Item";
import HomeItem from "./HomeItem";

const MissingList = ({ items, admin }) => {
  return (
    <div className="space-y-4 my-4">
      {admin ? (
        <div className="flex flex-wrap px-24 w-full">
          {items?.map((item, index) => (
            <div key={item.id} className="p-4 w-1/4">
              <Item item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap px-24 w-full">
          {items?.map((item, index) => (
            <div key={item.id} className="p-4 w-1/4">
              <HomeItem item={item} dash={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissingList;
