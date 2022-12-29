import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-emerald-600 p-6 text-white flex justify-between">
        <p className="text-lg">{user ? user.email : null}</p>
        <button
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
