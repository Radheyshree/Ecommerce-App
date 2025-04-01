import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

import '../admin.css';


const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-gray-300 border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/admin/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">ADD ITEMS</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/admin/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">SHOW LIST ITEMS</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/admin/orders"
        >
          <img className="w-5 h-5" src={assets.parcel_icon} alt="" />
          <p className="hidden md:block">ORDERS</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
