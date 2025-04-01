import React from "react";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import Bestsellers from "../components/Bestsellers";
import Policies from "../components/Policies";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
        {/* <NewsletterBox /> */}
      <Hero />
      <Bestsellers />
      <NewArrivals />
      <Policies />
    </div>
  );
}
export default Home;