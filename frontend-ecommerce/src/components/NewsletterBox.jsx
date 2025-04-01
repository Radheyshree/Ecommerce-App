import React from "react";

const NewsletterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our newsletter!");
      };
  return (
    <div className="text-center align-center justify-center bg-gray-100 flex flex-col sm:flex-row sm: gap-2 pt-2 text-center text-xs sm:text-sm md:text-base text-gray-600 ">
        <div>
        <p className="">Subscribe to our newsletter and get <b>15%</b> discount!</p>
        <p className="text-gray-400 mt-3">Get exciting updates and offers directly into your inbox</p>
        </div>
        <div>
        <form onSubmit={onSubmitHandler}>
            <input type="email"  placeholder="Enter your email address" className="border border-gray-400 p-2 mt-3" required/>
            <button className="bg-black text-white p-2 mt-3" type="submit">Subscribe</button>
        </form>
        </div> 
        
      
    </div>
  );
}
export default NewsletterBox;