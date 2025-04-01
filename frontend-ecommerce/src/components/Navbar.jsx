import React, { useState } from "react";
import {assets} from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const Navbar = () => {
    
    const [menuVisible, setMenuVisible] = useState(false);
    const {setShowSearch, cartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = ()=>{
      navigate("/login")
        localStorage.removeItem("token")
        setToken("")
        setCartItems({})
        
    }
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to="/">
      <img src={assets.logo} className='w-36' alt="logo" />
      </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to="/" className='flex flex-col items-center'>
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
            </NavLink>
            <NavLink to="/collection" className='flex flex-col items-center'>
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
            </NavLink>
            {/* <NavLink to="/about" className='flex flex-col items-center'>
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
            </NavLink>
            <NavLink to="/contact" className='flex flex-col items-center'>
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
            </NavLink> */}
            </ul>
            
            <div className="flex items-center gap-6">
                <Link to="/collection"><img onClick={()=> setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt=""/></Link>

                {/* Dropdown when logged in */}
                
                  <div className="group relative" >
                    <img src={assets.profile_icon} className="w-5 cursor-pointer hidden sm:block" alt="" onClick={()=> token ? null: navigate("/login")} />
                    
                    {
                  token && <div  className="group-hover:block hidden dropdown-menu absolute right-0 bg-transparent pt-4 ">
                    <div className={`flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded`}>
                        <p onClick={()=> navigate("/orders")} className="hover:text-black cursor-pointer">My Orders</p>
                        {/* <p  className="hover:text-black cursor-pointer">My Profile</p> */}
                        <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                    </div>
                    </div>
                    
                }
                </div>
            <Link to="/cart" className="relative group">
            <img src={assets.cart_icon} className="w-5 cursor-pointer" alt=""/>
            <p className="absolute -bottom-2 -right-2 bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded-full">{cartCount()}</p>
            </Link>

                <div className="group relative sm:hidden">
                <img src={assets.menu_icon} className="w-5 cursor-pointer" alt="" onClick={()=> setMenuVisible(!menuVisible)}/>
                    <div className="dropdown-menu absolute right-0 bg-transparent pt-4">
                    <div className={`flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded ${menuVisible ? 'block' : 'hidden'}`} onClick={()=> setMenuVisible(!menuVisible)}>
                        <Link to="/" className="hover:text-black cursor-pointer">HOME</Link>
                        <Link to="/collection" className="hover:text-black cursor-pointer">COLLECTION</Link>
                        <Link to="/orders" className="hover:text-black cursor-pointer">MY ORDERS</Link>
                        
                        <p onClick={logout} className="hover:text-black cursor-pointer">LOGOUT</p>
                        {/* <Link to="/about" className="hover:text-black cursor-pointer">ABOUT</Link>
                        <Link to="/contact" className="hover:text-black cursor-pointer">CONTACT</Link> */}
                    </div>
                    </div>
                    </div>

            </div>
            </div>

        
        
    
  );
}
export default Navbar;