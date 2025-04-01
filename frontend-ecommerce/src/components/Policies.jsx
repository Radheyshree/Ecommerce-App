import React from "react";
import { assets } from "../assets/assets";

const Policies = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm: gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 ">
        <div>
            <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt=""/>
            <p className="font-semibold">Easy Exchange Policy </p>
            <p className="text-gray-400"> We offer easy 7-day exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt=""/>
            <p className="font-semibold">Easy Return Policy </p>
            <p className="text-gray-400"> Avail free & easy 7-day return policy</p>
        </div>
        <div>
            <img src={assets.support_img} className="w-12 m-auto mb-5" alt=""/>
            <p className="font-semibold">Best Customer Support </p>
            <p className="text-gray-400"> Available to help you 24*7</p>
        </div>
      
    </div>
  );
}
export default Policies;