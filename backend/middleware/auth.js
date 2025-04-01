import jwt from 'jsonwebtoken'

//authenticate user for cart and order
const authUser = async(req, res, next) => {
    const token = req.headers.token
    if(!token){
        return res.json({success:false, message:"access denied, login again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
        
    }
}
export default authUser