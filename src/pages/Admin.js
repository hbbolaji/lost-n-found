import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddItem from "../components/AddItem";
import { useMissing } from "../context/MissingContext";
import MissingList from "../components/MissingList";

const Admin = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { items, getMissing } = useMissing();
  const { logout, user } = useAuth();
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

  useEffect(() => {
    getMissing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setList(items);
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
        <p className="text-2xl uppercase font-semibold">Admin</p>
        <div>
          <input
            className="p-3 rounded w-96 outline-none text-emerald-800"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="space-x-8">
          <button
            className="px-6 py-2 bg-white text-emerald-600 rounded-md"
            onClick={() => {
              navigate("/dashboard/admin/users", { replace: true });
            }}
          >
            Users
          </button>
          <button
            className="px-6 py-2 bg-white text-emerald-600 rounded-md"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "Cancel" : "Add Item"}
          </button>
          <button
            className="px-6 py-2 bg-white text-emerald-600 rounded-md"
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
          >
            Sign out
          </button>
        </div>
      </div>
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
      <div className="flex">
        <div className="flex-1">
          {/* <h1 className="px-28 text-lg font-semibold my-4">
            Results for Missing Items: 4 items
          </h1> */}
          {/* <MissingList items={items} /> */}
          <MissingList
            items={
              search === ""
                ? list
                : list.filter((item) => item.name === search) || list
            }
          />
        </div>
        {show ? (
          <div className="w-1/4 p-8 space-y-6">
            <h1 className="text-xl text-center font-semibold">
              Add Missing Items here
            </h1>
            <AddItem email={user.email} close={() => setShow(false)} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
