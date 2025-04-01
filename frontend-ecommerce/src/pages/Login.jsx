import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios"
import GoogleUserLogin from "../components/GoogleUserLogin.jsx";

const Login = () => {
  const {token, setToken, navigate, backend_url} = useContext(ShopContext)
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
 
  const onSubmitHandler = async(event) =>{
    event.preventDefault();
    try {
      if (currState === "Sign-up"){
        const response = await axios.post(backend_url+"/api/user/register", {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backend_url+"/api/user/login", {email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
 

  useEffect(()=>{
    if(token){
      navigate("/")
    }
  }, [token])

  return (
    <>
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"> 
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div>
      {currState === "Sign-up" ? <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required></input> : ""}
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required></input>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required></input>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer " onClick={()=>navigate("/admin/login")}> LOG IN AS ADMIN</p>
        {
          currState === "Sign-up" ?
          <p className="cursor-pointer" onClick={()=> setCurrState("Login")}>Log into existing user account !</p> :
          <p className="cursor-pointer" onClick={()=> setCurrState("Sign-up")}>Create a new user account !</p>
        }
      </div> 
      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">{currState}</button>
      <p className="mt-4 prata-regular">OR </p>      <div className="inline-flex items-center gap-2 mb-2 mt-4">
     
      {/* <h1 className="prata-regular text-xl"> Sign in with Google </h1> */}
      <GoogleUserLogin className="prata-regular text-xl"></GoogleUserLogin>
				
    </div>
      
    </form>
    
    </>
  );
}
export default Login;