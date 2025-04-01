import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const Bestsellers = () => {
    const {products} = useContext(ShopContext);
    
    const [bestProducts, setBestProducts] = useState([]);
    useEffect(() => {   
        setBestProducts(products.filter(item => item.bestseller === true));
    },[products]);

  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1="Best" text2="Sellers"></Title>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Most loved pieces by our customers. Shop now and see what the hype is all about.
            </p>
        </div>
        {/* Rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestProducts.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} />
            ))
        }
        </div>
    </div>
  );
}
export default Bestsellers;