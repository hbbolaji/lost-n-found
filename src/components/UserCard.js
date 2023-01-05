import React from "react";
import { useAuth } from "../context/AuthContext";

const UserCard = ({ user }) => {
  const { deleteUser } = useAuth();
  return (
    <div className="p-4 shadow-lg space-y-4 text-center">
      <p className="text-emerald-500 text-xl font-semibold capitalize text-center">
        {user.fullName}
      </p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <button
        className="px-4 py-2 bg-red-500 rounded text-white"
        onClick={() => deleteUser(user)}
      >
        Delete User
      </button>
    </div>
  );
};

export default UserCard;
