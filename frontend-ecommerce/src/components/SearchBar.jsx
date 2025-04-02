import React, {useContext, useEffect} from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname !== "/collection"){
            setShowSearch(false);
        }       
    },[location.pathname]);

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center px-5 py-2 mx-3 my-5 rounded-full w-3/4 sm:w-1/2 ">
            <input placeholder="Search items" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <img src={assets.search_icon} className="w-6 pl-2 cursor-pointer" alt=""/>
        </div>
        <img onClick={()=> setShowSearch(false)} src={assets.cross_icon} className="inline w-3 cursor-pointer" alt=""/>     
    </div>
  ): null;
}
export default SearchBar;