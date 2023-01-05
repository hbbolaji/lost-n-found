import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMissing } from "../context/MissingContext";

const AddFeedback = ({ user }) => {
  const [content, setContent] = useState("");
  const { createFeedback } = useMissing();

  const handleSubmit = () => {
    createFeedback({
      name: user.fullName,
      email: user.email,
      id: uuidv4(),
      content,
    });
    setContent("");
  };
  return (
    <div className="flex flex-col space-y-6 p-4">
      <h1 className="text-xl text-center font-semibold">
        Submit your feedbacks here
      </h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="outline-none border border-emerald-600 p-4"
        rows={4}
      />
      <button
        className="px-6 py-2 text-white bg-emerald-600 rounded-md"
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default AddFeedback;
