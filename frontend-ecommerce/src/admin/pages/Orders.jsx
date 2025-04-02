import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import { ShopContext } from "../../context/ShopContext";

const AdminOrders = ({token}) => {

  const {backend_url, currency} = useContext(ShopContext)
  const [allorders,setOrders] = useState([])


    const fetchAllOrders = async() => {
      if(!token){
        return null;
      }
      try {
        const response = await axios.post(backend_url+"/api/order/list",{},{headers:{token}})
        
        if(response.data.success){
              setOrders(response.data.orders)
          }
              else{
                toast.error(response.data.message)
              }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
const statusHandler = async(event, orderId) =>{
  try {
    const response = await axios.post(backend_url+"/api/order/status",{orderId, status:event.target.value}, {headers:{token}})
    if(response.data.success){
      await fetchAllOrders()
      toast.success(response.data.message)
      }
  } catch (error) {
    console.log(error)
    toast.error(response.data.message)
  }

}
    useEffect(()=>{
      fetchAllOrders()
    },[token])
  
  return (
    <div>
       <h3>ALL  ORDERS</h3>
      <div>
        {
          allorders.map((order,index)=>(
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2f_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 " key={index}>
              <img className="w-12" src={assets.parcel_icon} alt=""/>
              <div>
              <div>
                {order.items.map((item,index)=>{
                  if(index===order.items.length - 1){
                    return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span> {item.size}</span></p>
                  }
                  else{
                    return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span> {item.size}</span>,</p>
                  }
                })}
                </div>
                <p className="mt-3mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  
                </div>
                <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Different Items: {order.items.length}</p>
              <p className="mt-3">Payment Method: {order.paymentMethod}</p>
              <p>Payment Status: {order.payment ? "Done":"Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">Order Amount:<br/> {currency} {order.amount}</p>
              <select onChange={(event)=> statusHandler(event,order._id)} value={order.status} className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ) )
        }
      </div> 

    </div>
  )
}

export default AdminOrders;