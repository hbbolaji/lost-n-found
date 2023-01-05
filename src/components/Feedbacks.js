import React, { useEffect } from "react";
import { useMissing } from "../context/MissingContext";

const Feedbacks = () => {
  const { feedbacks, getFeedbacks } = useMissing();
  useEffect(() => {
    getFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl text-center font-semibold">Feedbacks</h1>
      <div className="flex flex-wrap px-12">
        {feedbacks.map((feed) => (
          <div key={feed.id} className="p-4 w-1/4">
            <div className="p-8 rounded-lg shadow-lg space-y-3">
              <p className="text-lg font-semibold italic leading-relaxed">
                {feed.content}
              </p>
              <p className="text-right"> - {feed.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
