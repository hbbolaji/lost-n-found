import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddItem from "../components/AddItem";
import MissingList from "../components/MissingList";
import { useMissing } from "../context/MissingContext";

const Dashboard = () => {
  const { user, logout, checkAdmin, loggedInUser } = useAuth();
  const { getDashItems, dashItems } = useMissing();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      checkAdmin(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    user && getDashItems(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
        <p className="text-lg">
          Welcome, {user ? loggedInUser.fullName : "User"}
        </p>
        {/* <p className="text-2xl uppercase font-semibold">{user?.email}</p> */}
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
              navigate("/dashboard/profile");
            }}
          >
            Profile
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
          <MissingList
            items={
              search === ""
                ? dashItems
                : dashItems.filter((item) => item.name === search) || dashItems
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

export default Dashboard;
// 544498023
