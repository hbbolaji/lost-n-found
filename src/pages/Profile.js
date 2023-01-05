import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UpdateProfile from "../components/UpdateProfile";

const Profile = () => {
  const { user, loggedInUser, logout, checkAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      checkAdmin(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
        <p className="text-lg">
          Welcome, {user ? loggedInUser.fullName : "User"}
        </p>
        {/* <p className="text-2xl uppercase font-semibold">{user?.email}</p> */}
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
              logout();
              navigate("/", { replace: true });
            }}
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="w-1/2 mx-auto my-16">
        <UpdateProfile user={loggedInUser} />
      </div>
    </div>
  );
};

export default Profile;
