import { Form, Formik } from "formik";
import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

const Contact = () => {
  const initialValue = {
    email: "",
    title: "",
    message: "",
  };
  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="w-full">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => submitHandler(values)}
        >
          {(formik) => (
            <Form className="space-y-6">
              <TextInput
                label="Email"
                placeholder="Enter Email"
                value={formik.email}
                name="email"
              />
              <TextInput
                label="Title"
                placeholder="Enter a Title"
                value={formik.title}
                name="password"
              />
              <TextArea
                label="Message"
                placeholder="Enter a Title"
                value={formik.message}
                name="password"
              />
              <div>
                <button
                  className="text-lg px-6 py-3 bg-emerald-600 rounded-md text-white"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
