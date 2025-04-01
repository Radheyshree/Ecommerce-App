import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [token, setToken] = useState("")
    const currency = "INR";
    const delivery_fee = 29;
    const backend_url = import.meta.env.VITE_BACKEND_URL
    
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size", {
                autoClose: 2000
            });
            return;
        }
        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        console.log("cart items", cartData)
        if(token){
            try {
                console.log(token)
                await axios.post(backend_url+"/api/cart/add", {itemId, size}, {headers:{token}})
                toast.success("Added to Cart", {
                    autoClose: 800 // Closes after 5 seconds
                });
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
        else{
            toast.error("Please Login first!")
        }
        

    }

    const cartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        //console.log(cartItems);
                        totalCount += Number(cartItems[items][item]);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backend_url+"/api/cart/update", {itemId, size, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += Number(itemInfo.price) * Number(cartItems[items][item]);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return totalAmount;
    }
    const getUserCart = async(token) => {
        try {
            const response = await axios.post(backend_url+"/api/cart/get",{},{headers:{token}})
            if (response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getProductsData = async () => {
        try {
            const response = await axios.get(backend_url + '/api/product/all')
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
        
    }, [])
 
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        
        
    }, [])

    const value = {
        products, currency, delivery_fee, backend_url,
        search, setSearch, showSearch, setShowSearch, cartItems, setCartItems,
        addToCart, cartCount, updateQuantity, getCartAmount,
        navigate, token, setToken
    }


    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
