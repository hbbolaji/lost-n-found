import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-[600px] w-full bg-hero bg-no-repeat bg-cover bg-center text-center">
        <div className="bg-black h-[600px] w-full rounded bg-opacity-60 flex flex-col items-center justify-center space-y-12">
          <h1 className="text-5xl font-bold text-white">
            Welcome to Lost and Found Tracking System
          </h1>
          <p className="text-white text-xl w-1/2 mx-auto leading-relaxed">
            Did you lose your item and are not able to find it? Do not worry, we
            will assist students, staff and visitors on campus in finding their
            misplaced belongings more quickly.
          </p>
          <button
            className="text-lg rounded-md px-6 py-5 bg-emerald-600 text-white"
            onClick={() => navigate("/register")}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
