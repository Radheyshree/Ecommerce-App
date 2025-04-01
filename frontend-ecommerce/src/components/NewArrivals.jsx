import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const NewArrivals = () => {
    const {products} = useContext(ShopContext);
    
    const [newProducts, setNewProducts] = useState([]);
    useEffect(() => {   
        setNewProducts(products.slice(0,10));
    },[products]);

  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1="New" text2="Collection"></Title>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            The latest and greatest in the world of fashion. Shop now and stay ahead of the trend.
            </p>
        </div>
        {/* Rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            newProducts.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} />
            ))
        }
        </div>
    </div>
  );
}
export default NewArrivals;