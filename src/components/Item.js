import React, { useState } from "react";
import { useMissing } from "../context/MissingContext";
import Modal from "./Modal";
import Contact from "./Contact";

const Item = (item) => {
  const [show, setShow] = useState(false);
  const close = () => {
    setShow(false);
  };
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
          {item.item.found && (
            <p className="text-white bg-emerald-600 p-2 rounded">Recovered</p>
          )}
          {!item.item.found && item.item.founderEmail === "admin@admin.com" && (
            <p className="text-white bg-orange-600 p-2 rounded">With Admin</p>
          )}
          {!item.item.found && item.item.founderEmail !== "admin@admin.com" && (
            <p className="text-white bg-red-600 p-2 rounded">Lost</p>
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
      <div className="py-4 flex items-center justify-center p-4 text-sm ">
        {item.item.found ? null : (
          <button
            onClick={() =>
              item.item.founderEmail === "admin@admin.com"
                ? setAsFound({ ...item.item, found: true })
                : setShow(true)
            }
            // onClick={() => setAsFound({ ...item.item, found: true })}
            className=" px-4 py-2 bg-emerald-600 rounded-md text-white"
          >
            {item.item.founderEmail === "admin@admin.com"
              ? "Resolve"
              : "Set Item as Recovered"}
          </button>
        )}
      </div>
      {show ? (
        <Modal close={close}>
          <Contact
            item={item.item}
            close={close}
            changeState={() => setAsFound({ ...item.item, found: true })}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default Item;
