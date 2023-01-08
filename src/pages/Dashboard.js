import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddItem from "../components/AddItem";
import MissingList from "../components/MissingList";
import { useMissing } from "../context/MissingContext";
import AddFeedback from "../components/AddFeedback";

const Dashboard = () => {
  const { user, logout, checkAdmin, loggedInUser } = useAuth();
  const [toggle, setToggle] = useState("");
  const { getDashItems, dashItems } = useMissing();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [select, setSelect] = useState("all");
  const [list, setList] = useState([...dashItems]);
  const selectCategory = (cat) => {
    setSelect(cat);
    if (cat === "all") {
      setList([...dashItems]);
    } else if (cat === "missing") {
      setList(
        [...dashItems].filter(
          (prev) => !prev.found && prev.founderEmail !== "admin@admin.com"
        )
      );
    } else if (cat === "withAdmin") {
      setList(
        [...dashItems].filter(
          (prev) => !prev.found && prev.founderEmail === "admin@admin.com"
        )
      );
    } else if (cat === "found") {
      setList([...dashItems].filter((prev) => prev.found));
    }
  };

  useEffect(() => {
    if (user) {
      checkAdmin(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    user && getDashItems(user.email);
    user && checkAdmin(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setList(dashItems);
  }, [dashItems]);

  return (
    <div className="space-y-6">
      <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
        <p className="text-lg cursor-pointer" onClick={() => navigate("/")}>
          Home
        </p>
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
              setToggle("feed");
              setShow(!show);
            }}
          >
            {show ? "Cancel" : "Feedback"}
          </button>
          <button
            className="px-6 py-2 bg-white text-emerald-600 rounded-md"
            onClick={() => {
              setToggle("add");
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
          Lost
        </button>
        <button
          onClick={() => selectCategory("withAdmin")}
          className={`${
            select === "withAdmin"
              ? "bg-emerald-600 text-white"
              : "border border-emerald-600 text-emerald-600"
          } rounded px-4 py-2`}
        >
          With Admin
        </button>
        <button
          onClick={() => selectCategory("found")}
          className={`${
            select === "found"
              ? "bg-emerald-600 text-white"
              : "border border-emerald-600 text-emerald-600"
          } rounded px-4 py-2`}
        >
          Recovered
        </button>
      </div>
      <div className="flex">
        <div className="flex-1">
          <MissingList
            admin={false}
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
              Add Missing Items Here
            </h1>
            {toggle === "add" && (
              <AddItem email={user.email} close={() => setShow(false)} />
            )}
            {toggle === "feed" && <AddFeedback user={loggedInUser} />}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
// 544498023
