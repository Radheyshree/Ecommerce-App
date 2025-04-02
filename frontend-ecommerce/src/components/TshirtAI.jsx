import React from "react";

const TshirtAI = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        alert("Thank you for giving your prompt");
      };
  return (
    <div className="text-center align-center justify-center bg-gray-100 flex flex-col sm:flex-row sm: gap-2 pt-2 text-center text-xs sm:text-sm md:text-base text-gray-600 ">
        <div>
        <p className="">Get your <b>AI customised T-shirt</b> to beat the trend</p>
        <p className="text-gray-400 mt-3">Use our special AI tool to customise your perfect tee delivered right to your doorstep!</p>
        </div>
        <div>
        <form onSubmit={onSubmitHandler}>
            <input type="text"  placeholder="Enter your design prompt" className="border border-gray-400 p-2 mt-3" required/>
            <button className="bg-black text-white p-2 mt-3" type="submit">Build My Design</button>
        </form>
        </div> 
        
      
    </div>
  );
}
export default TshirtAI;