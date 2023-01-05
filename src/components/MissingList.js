import React, { useState } from "react";
import Item from "./Item";

const MissingList = ({ items }) => {
  const [select, setSelect] = useState("all");
  const [list, setList] = useState([...items]);
  const selectCategory = (cat) => {
    setSelect(cat);
    if (cat === "all") {
      setList([...items]);
    } else if (cat === "missing") {
      setList([...items].filter((prev) => !prev.found));
    } else if (cat === "found") {
      setList([...items].filter((prev) => prev.found));
    }
  };
  return (
    <div className="space-y-4 my-4">
      <div className="space-x-4 px-28">
        <button
          onClick={() => selectCategory("all")}
          className={`${
            select === "all"
              ? "bg-emerald-600 text-white"
              : "border border-emerald-600 text-emerald-600"
          } rounded px-4 py-2`}
        >
          All
        </button>
        <button
          onClick={() => selectCategory("missing")}
          className={`${
            select === "missing"
              ? "bg-emerald-600 text-white"
              : "border border-emerald-600 text-emerald-600"
          } rounded px-4 py-2`}
        >
          Missing
        </button>
        <button
          onClick={() => selectCategory("found")}
          className={`${
            select === "found"
              ? "bg-emerald-600 text-white"
              : "border border-emerald-600 text-emerald-600"
          } rounded px-4 py-2`}
        >
          Found
        </button>
      </div>
      <div className="flex flex-wrap px-24 w-full">
        {list?.map((item, index) => (
          <div key={item.id} className="p-4 w-1/4">
            <Item item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissingList;
