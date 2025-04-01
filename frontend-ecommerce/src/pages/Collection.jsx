import React, { use, useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const {products} = useContext(ShopContext);
    const {currency} = useContext(ShopContext);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setsubcategory] = useState([]);
    const [sortType, setSortType] = useState("relevance");

    const {search, showSearch} = useContext(ShopContext);
    // useEffect(() => {   
    //     setFilteredProducts(products);
    // },[]); 

    useEffect(() => {
        applyFilters();
   },[category, subcategory, search, showSearch, products]);
    
    useEffect(() => {
        sortProducts();
    },[sortType]);

    const toggleCategory = (e) => {
        if(e.target.checked){
            setCategory([...category, e.target.value]);
        }else{
            setCategory(category.filter(item => item !== e.target.value));
        }
     }
     const togglesubcategory = (e) => {
        if(e.target.checked){
            setsubcategory([...subcategory, e.target.value]);
        }else{
            setsubcategory(subcategory.filter(item => item !== e.target.value));
        }
     }
    const applyFilters = () => {
        let tempProducts = products.slice();
        
        if(showSearch && search){
            tempProducts = tempProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        if(category.length > 0 && subcategory.length > 0){
            setFilteredProducts(tempProducts.filter(item => (category.includes(item.category) && subcategory.includes(item.subcategory))));
        }
        else if(category.length > 0 || subcategory.length > 0 ){
            setFilteredProducts(tempProducts.filter(item =>(category.includes(item.category) || subcategory.includes(item.subcategory))));
        }
        else{
            setFilteredProducts(tempProducts); 
        }       
        setSortType("relevance"); 
    }
    const sortProducts = () => {
        let tempFilteredProducts = filteredProducts.slice();
        if(sortType === "low-high"){
            setFilteredProducts(tempFilteredProducts.sort((a, b) => a.price - b.price)); 
        }
        else if(sortType === "high-low"){
            setFilteredProducts(tempFilteredProducts.sort((a, b) => b.price - a.price)); 
        }
        else{
            applyFilters();
        }

    }
    
    

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filters on left */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2 " onClick={()=> setShowFilters(!showFilters)}>
        FILTER
        <img src={assets.dropdown_icon} className={`w-2 h-3 sm:hidden ${showFilters ? "rotate-90":""}`} alt=""/>    
        </p>
        {/* Category Filters */}
        <div className={`border border-gray-300 pl-3 pr-1 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
        <p className="text-sm mb-3 font-medium">Category</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"> 
                <input type="checkbox" className="w-3 cursor-pointer" value="Men" onChange={toggleCategory}/>Men
                <input type="checkbox" className="w-3 cursor-pointer" value="Women" onChange={toggleCategory}/>Women
                <input type="checkbox" className="w-3 cursor-pointer" value="Kids" onChange={toggleCategory}/>Kids
            </p>
       </div>
        </div>
        {/* Sub-Category Filters */}
        <div className={`border border-gray-300 pl-3 pr-1 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
        <p className="text-sm mb-3 font-medium">Type</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"> <input type="checkbox" className="w-3 cursor-pointer" value="Topwear" onChange={togglesubcategory}/>Topwear </p>
            <p className="flex gap-2"> <input type="checkbox" className="w-3 cursor-pointer" value="Bottomwear" onChange={togglesubcategory}/>Bottomwear</p>
            <p className="flex gap-2"> <input type="checkbox" className="w-3 cursor-pointer" value="Winterwear" onChange={togglesubcategory}/>Winterwear</p>
       </div>
        </div>
      </div>

      {/* Collections on Right */}
      <div className="flex-1 pt-3">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1="ALL" text2="COLLECTIONS"/>
            {/* Product sort */}
            <select className="border-2 border-gray-300 text-sm px-2 " value={sortType} onChange={(e)=>setSortType(e.target.value)} >
                <option value="relevance" >Sort By: Relevance</option>
                <option value="low-high" >Sort By Price: low to High</option>
                <option value="high-low" >Sort By Price: High to low</option>
            </select>
        </div>
        {/* Products display */}
        <div className="grid grid-cols-2 ms:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {
            filteredProducts.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} />
            ))
        }

      </div>
    </div>
    </div>
  );
}
export default Collection;