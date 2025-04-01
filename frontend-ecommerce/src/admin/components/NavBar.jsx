import React from "react";

const AdminNavBar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-3 px-[4%] bg-gray-300">
      <img className="w-[max(10%,80px)]" src={"/src/assets/logo.png"} alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white cursor-pointer px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        LOG OUT
      </button>
    </div>
  );
};

export default AdminNavBar;
