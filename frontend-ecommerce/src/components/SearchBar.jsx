import React, {useContext, useEffect} from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/collection"){
            setShowSearch(true);
        }
        else{
            setShowSearch(false);
        }
        
    },[location.pathname]);

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 my-5 rounded-full w-3/4 sm:w-1/2 ">
            <input type="text" placeholder="Search items" className="flex-1 outline-none bg-inherit text-sm" value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <img src={assets.search_icon} className="w-4 cursor-pointer" alt=""/>
        </div>
        <img onClick={()=> setShowSearch(false)} src={assets.cross_icon} className="inline w-3 cursor-pointer" alt=""/>     
    </div>
  ): null;
}
export default SearchBar;