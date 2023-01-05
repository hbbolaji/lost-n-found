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

  useEffect(() => {
    getMissing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
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
      <div className="flex">
        <div className="flex-1">
          <h1 className="px-28 text-lg font-semibold my-4">
            Results for Missing Items: 4 items
          </h1>
          {/* <MissingList items={items} /> */}
          <MissingList
            items={
              search === ""
                ? items
                : items.filter((item) => item.name === search) || items
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
