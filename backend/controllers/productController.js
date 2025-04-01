import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

//Add Product
const addProduct = async(req,res) => {
    try {
        const {name, desc, price, category, subcategory, sizes, bestseller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)
        console.log(name, desc, price, category, subcategory, sizes, bestseller)
        
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
            return result.secure_url    }
            )
        )
        console.log(imagesUrl);
        const productData = {
            name,
            desc,
            category,
            price: Number(price),
            subcategory,
            sizes,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData)

        //saving into db
        const product = new productModel(productData)
        await product.save()
        res.json({success:true, message: "Product Added successfully"})
        

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}

//List Products
const listProducts = async(req,res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true, message: "All Products listed successfully", products})
        

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

//List one Product
const showProduct = async(req,res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        
        if (product){
            res.json({success:true, message: "Product found successfully", product})
        }
        else{
            res.json({success:false, message: "Product was removed earlier", product})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
        
    }
    
}

//Remove Product
const delProduct = async(req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Product deleted successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

export {addProduct, listProducts, showProduct, delProduct}