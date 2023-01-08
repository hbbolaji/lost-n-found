import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";

const Users = () => {
  const navigate = useNavigate();
  const { getUsers, users, logout } = useAuth();
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
        <p className="text-lg cursor-pointer" onClick={() => navigate("/")}>
          Home
        </p>
        <p className="text-2xl uppercase font-semibold">Admin</p>
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
              navigate("/dashboard/admin", { replace: true });
            }}
          >
            Items
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
        {users
          .filter((u) => u.email !== "admin@admin.com")
          .map((user) => (
            <div key={user.id} className="w-1/4 p-4 rounded-lg">
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
