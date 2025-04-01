import express from "express"
import {allOrders, userOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateOrderStatus, verifyStripe} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter= express.Router()
//Admin Features
orderRouter.post("/list",adminAuth, allOrders)
orderRouter.post("/status",adminAuth, updateOrderStatus)

//Payment features, cod & razorpay
orderRouter.post("/place",authUser, placeOrder)
orderRouter.post("/stripe",authUser, placeOrderStripe )
orderRouter.post("/razorpay",authUser, placeOrderRazorpay)

//user features
orderRouter.post("/userorders", authUser, userOrders)

//verify payments
orderRouter.post("/verifyStripe", authUser, verifyStripe)
export default orderRouter