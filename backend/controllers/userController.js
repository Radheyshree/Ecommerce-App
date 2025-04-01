import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//token creation
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body

        //checking if user already exists
        const user = await userModel.findOne({email})
        if(!user){
         return res.json({success:false, message:"New user: Please sign up"})
        }

        //validating password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.json({success:false, message:"Please enter correct password"})
        }

        //token creation
        const token = createToken(user._id)
        
        //logging in
        res.json({success:true, token})
     
      } catch (error) {
         console.log(error);
         res.json({success:false, message:error.message})
     }

}
// Route for Google login
const googleLogin = async (req, res) => {
    // try {
    //     const { token } = req.body;

    //     // Verify the token with Google
    //     const ticket = await client.verifyIdToken({
    //         idToken: token,
    //         audience: process.env.GOOGLE_CLIENT_ID,
    //     });
        
    //     const payload = ticket.getPayload();
    //     const { sub, email, name } = payload; // sub is the Google ID

    //     // Check if the user already exists in the database
    //     let user = await userModel.findOne({ googleId: sub });
        
    //     if (!user) {
    //         // If not, create a new user
    //         user = new userModel({
    //             name,
    //             email,
    //             googleId: sub,
    //         });
    //         await user.save();
    //     }

    //     // Create a JWT token for the authenticated user
    //     const jwtToken = createToken(user._id);
        
    //     res.json({ success: true, token: jwtToken });

    // } catch (error) {
    //     console.log(error);
    //     res.json({ success: false, message: error.message });
    // }
};

//Route for user registration
const registerUser = async (req,res)=>{
    try {
       const {name,email,password} = req.body
       //checking if user already exists
       const exists = await userModel.findOne({email})
       if(exists){
        return res.json({success:false, message:"User already exists"})
       }
       //validating email format and strong password
       if (!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter a valid email"})
       }
       if (password.length < 8){
        return res.json({success:false, message:"Please enter a valid password with length > 8"})
       }
       //hashing password
       const salt = await bcrypt.genSalt(11)
       const hashedPassword = await bcrypt.hash(password,salt)

       //creating account
    const newUser = new userModel({
    name,
    email,
    password:hashedPassword
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({success: true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Route for Admin Login
const adminLogin = async (req,res)=>{
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_ID){
            if(password !== process.env.ADMIN_PASSWORD){
                return res.json({success:false, message:"Please enter correct password for admin access"})
            }
            else{
                //creating token
                const token = jwt.sign(email+password, process.env.JWT_SECRET)
                res.json({success:true, token})
            }

        }
        else{
            return res.json({success:false, message:"Please enter correct email for admin access"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

export {loginUser,registerUser, adminLogin, googleLogin}