import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import { OAuth2Client } from 'google-auth-library';
import authRoutes from './routes/authRoutes.js'
//App Config

const app=express()
const port=process.env.PORT || 4000;
connectDB() 
connectCloudinary()
const corsOptions = {
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'token', "Token"],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };
  
  

//Middlewares
app.use(express.json())
app.use(cors(corsOptions));

app.use(express.json());

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const JWT_SECRET = process.env.JWT_SECRET;
// const client = new OAuth2Client(CLIENT_ID);

//API Endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.get("/",(req,res)=>{
    res.send("API Working")
})
app.use('/api/v1/auth', authRoutes);

app.listen(port, ()=>console.log("Server started on PORT: " + port))