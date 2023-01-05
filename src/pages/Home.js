import React from "react";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Missing from "../components/Missing";
import Feedbacks from "../components/Feedbacks";

const Home = () => {
  return (
    <div className="space-y-8 mb-24">
      <Banner />
      <Features />
      <Missing />
      <Feedbacks />
    </div>
  );
};

export default Home;
