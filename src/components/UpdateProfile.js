import { Form, Formik } from "formik";
import React from "react";
import TextInput from "./TextInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ user }) => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const initialValue = {
    fullName: user.fullName || "",
    phone: user.phone || "",
  };
  const submitHandler = (values) => {
    updateUser({ fullName: values.fullName, phone: values.phone, id: user.id });
    navigate("/dashboard");
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => submitHandler(values)}
      >
        {(formik) => (
          <Form className="space-y-6">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formik.fullName}
              name="fullName"
            />
            <TextInput
              label="Phone"
              placeholder="Enter your password"
              value={formik.phone}
              name="phone"
            />
            <div className="space-x-4">
              <button
                className="text-lg px-6 py-3 bg-emerald-600 rounded-md text-white"
                type="submit"
              >
                Update Profile
              </button>
              {/* <button
                className="text-lg px-6 py-3 border border-emerald-600 text-emerald-600 rounded-md text-white"
                onClick={navigate("/dashboard")}
              >
                Cancel
              </button> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfile;
