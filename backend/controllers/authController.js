import axios from 'axios';
import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
import oauth2Client from '../utils/oauth2client.js';
// import catchAsync from './../utils/catchAsync';
// import AppError from './../utils/appError';
import User from '../models/userModel.js';

//token creation
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}
// const signToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_TIMEOUT,
//     });
// };
// Create and send Cookie ->
// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user.id);

//     console.log(process.env.JWT_COOKIE_EXPIRES_IN);
//     const cookieOptions = {
//         expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//         path: '/',
//         // sameSite: "none",
//         secure: false,
//     };
//     if (process.env.NODE_ENV === 'production') {
//         cookieOptions.secure = true;
//         cookieOptions.sameSite = 'none';
//     }

//     user.password = undefined;

//     res.cookie('jwt', token, cookieOptions);

//     console.log(user);

//     res.status(statusCode).json({
//         message: 'success',
//         token,
//         data: {
//             user,
//         },
//     });
// };
/* GET Google Authentication API. */
const googleAuth = (async (req, res, next) => {
    try {
    const code = req.query.code;
    console.log("USER CREDENTIAL -> ", code);

    const googleRes = await oauth2Client.getToken(code);
    
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
	);
	
    let user = await User.findOne({ email: userRes.data.email });
   
    if (!user) {
        
        console.log('New User found');
        user = await User.create({
            name: userRes.data.name,
            email: userRes.data.email,
            password: "",
            googleId: userRes.data.id
        });
    }
    

    const token = createToken(user._id)
    
    res.json({success: true, token})

} catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
}
    
});
export default googleAuth