import { Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import TextInput from "./TextInput";
import { useAuth } from "../context/AuthContext";

const Contact = ({ item, close, changeState }) => {
  const { getUserInfo, userInfo } = useAuth();
  const form = useRef();
  const initialValue = {
    email: item?.founderEmail || "",
    subject: `${item.name.toUpperCase()} Lost and Found Message Alert!` || "",
    id: item?.id || "",
    name: userInfo?.fullName || "",
  };
  const submitHandler = (values) => {
    emailjs
      .sendForm(
        "service_77pfb4b",
        "template_rrch5p5",
        form.current,
        "hwN3UmJ_zhoXKwJ9Z"
      )
      .then(
        (result) => {
          console.log(result.text);
          close();
        },
        (error) => {
          console.log(error.text);
          close();
        }
      );
    changeState();
  };

  useEffect(() => {
    getUserInfo(item?.founderEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(userInfo);

  return (
    <div className="space-y-6">
      <h1 className="font-semibold text-center text-xl">
        Contact Owner: {item.founderEmail}
      </h1>
      <div className="w-full">
        <Formik
          // ref={ref}
          initialValues={initialValue}
          onSubmit={(values) => submitHandler(values)}
        >
          {(formik) => (
            <Form className="space-y-6" ref={form}>
              <TextInput
                label="Email"
                placeholder="Enter Email"
                value={formik.email || item.founderEmail}
                name="email"
              />
              <div className="hidden">
                <TextInput
                  label="name"
                  placeholder="Enter name"
                  value={formik.name || userInfo?.fullName}
                  name="name"
                />
                <TextInput
                  label="name"
                  placeholder="Enter id"
                  value={formik.id || item.id}
                  name="id"
                />
              </div>
              <TextInput
                label="Subject"
                placeholder="Enter a Subject"
                value={
                  formik.subject ||
                  `${item.name.toUpperCase()} : Lost and Found Message Alert!`
                }
                name="subject"
              />
              <div className="space-x-2">
                <button
                  className="text-lg px-6 py-3 bg-emerald-600 rounded-md text-white"
                  type="submit"
                >
                  Send
                </button>
                <button
                  className="text-lg px-6 py-3 bg-red-600 rounded-md text-white"
                  type="button"
                  onClick={close}
                >
                  Cancel
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
