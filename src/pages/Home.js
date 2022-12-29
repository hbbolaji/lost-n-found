import React, { useState } from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2">
        {show ? (
          <div className="shadow rounded p-16 space-y-8">
            <h1 className="text-2xl font-semibold text-center">
              Register to Report a Missing Item
            </h1>
            <Signup />
            <p className="text-lg">
              Already have an account,{" "}
              <span
                className="cursor-pointer text-emerald-600 hover:underline"
                onClick={() => setShow(false)}
              >
                Sign in here
              </span>
            </p>
          </div>
        ) : (
          <div className="shadow rounded p-16 space-y-8">
            <h1 className="text-2xl font-semibold text-center">
              Sign in to Report a Missing Item
            </h1>
            <Signin />
            <p className="text-lg">
              Don't have an account,{" "}
              <span
                className="cursor-pointer text-emerald-600 hover:underline"
                onClick={() => setShow(true)}
              >
                Create an account
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
