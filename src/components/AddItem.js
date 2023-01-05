import { Form, Formik } from "formik";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useMissing } from "../context/MissingContext";

const AddItem = ({ email, close }) => {
  const { addMissingItem, uploadCoverImage, imageUrl, progress } = useMissing();
  const [file, setFile] = useState({});
  const initialValue = {
    name: "",
    description: "",
    phone: "",
  };
  const formHandler = (e) => {
    const files = e.target.files || [];
    const file = files[0];
    setFile(file);
    uploadCoverImage(file);
  };
  const submitHandler = (values) => {
    addMissingItem({
      ...values,
      id: uuidv4(),
      founderEmail: email,
      fileUrl: imageUrl,
      found: email === "admin@admin.com" ? true : false,
      reportedMissing: email === "admin@admin.com" ? false : true,
    });
    close();
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
              label="Name of Item"
              placeholder="Name of Item"
              value={formik.name}
              name="name"
              type="text"
            />
            <TextInput
              label="phone"
              placeholder="Phone number"
              value={formik.name}
              name="phone"
              type="text"
            />
            <div className="h-48 rounded border border-dotted border-emerald-500 flex flex-col items-center justify-center">
              {progress > 0 && progress < 100 ? (
                <p className="text-emerald-600">Uploading: {progress} %</p>
              ) : (
                <p>{file.name}</p>
              )}
              <label
                htmlFor="coverImage"
                className="mx-4 px-6 py-3 bg-emerald-600 rounded text-white text-sm font-semibold cursor-pointer"
              >
                Add Image
              </label>
              <input
                id="coverImage"
                type="file"
                name="coverImage"
                className="hidden"
                onChange={formHandler}
              />
            </div>
            <TextArea
              label="Description"
              placeholder="Enter your password"
              value={formik.password}
              name="description"
              type="text"
            />
            <div>
              <button
                className="text-lg px-6 py-3 bg-emerald-600 rounded-md text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const registerSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  description: yup.string().required("description is requried"),
  phone: yup.string().required("phone number is requried"),
});

export default AddItem;
