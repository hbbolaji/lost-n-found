import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import TextInput from "./TextInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { user, signupWithEmail } = useAuth();
  const initialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const submitHandler = (values) => {
    signupWithEmail(values.email, values.password);
    navigate("/dashboard", { replace: true });
  };
  console.log(user);
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
              label="Email"
              placeholder="Enter your email"
              value={formik.email}
              name="email"
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
  email: yup.string().required("Email field is required"),
  password: yup.string().required("Password is requried"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default Signup;
