import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import TextInput from "./TextInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { signupWithEmail, createUser } = useAuth();
  const initialValue = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const submitHandler = (values) => {
    signupWithEmail(values);
    createUser({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      id: uuidv4(),
    });
    navigate("/dashboard", { replace: true });
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={initialValue}
        validationSchema={registerSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {(formik) => (
          <Form className="space-y-6">
            <TextInput
              label="Full Name"
              placeholder="Enter your fullname"
              value={formik.fullName}
              name="fullName"
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={formik.email}
              name="email"
            />
            <TextInput
              label="Phone"
              placeholder="Enter your Phone Number"
              value={formik.phone}
              name="phone"
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={formik.password}
              name="password"
              type="password"
            />
            <TextInput
              label="Confirm Password"
              placeholder="Confirm password"
              value={formik.confirmPassword}
              name="confirmPassword"
              type="password"
            />
            <div>
              <button
                className="text-lg px-6 py-3 bg-emerald-600 rounded-md text-white"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email field is required"),
  password: yup.string().required("Password is requried"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default Signup;
