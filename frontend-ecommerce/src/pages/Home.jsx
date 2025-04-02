import React from "react";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import Bestsellers from "../components/Bestsellers";
import Policies from "../components/Policies";
import TshirtAI from "../components/TshirtAI";


const Home = () => {
  return (
    <div>
       <TshirtAI/>
      <Hero />
      <Bestsellers />
      <NewArrivals />
      <Policies />
    </div>
  );
}
export default Home;