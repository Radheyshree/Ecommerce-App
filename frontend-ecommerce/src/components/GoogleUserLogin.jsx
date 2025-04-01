import React, {useEffect, useContext} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../services/api";
import { GoogleLogin } from "@react-oauth/google";     
import { ShopContext } from "../context/ShopContext";
import {toast} from 'react-toastify'
import {jwtDecode} from 'jwt-decode'


const GoogleUserLogin = () => {
	const {token, setToken, navigate} = useContext(ShopContext)

	
		const responseGoogle = async (authResult) => {
			try {
				// console.log(authResult)
				if (authResult["code"]) {
					// console.log(authResult.code);
					const response = await googleAuth(authResult.code);
					// console.log(result)
					if(response.data.success){
							  setToken(response.data.token)
							  localStorage.setItem("token", response.data.token)
							}
							else{
							  toast.error(response.data.message)
							}
					
					
				} else {
					console.log(authResult);
					throw new Error(authResult);
				}
			} catch (e) {
				console.log(e);
			}
		};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	useEffect(()=>{
		if(token){
		  navigate("/")
		}
	  }, [token])

	return (
		<button
		onClick={googleLogin}>Sign in with Google</button>
		// <GoogleLogin onClick={googleLogin}/>
					
		
			
	);
}


export default GoogleUserLogin;