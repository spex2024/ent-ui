import React from "react";



const NotFound = ({ message }) => {
  return (
    <div className=" w-full flex flex-col items-center justify-center h-screen">
      <p className="text-xl mt-4">{message || "No content found."}</p>
    </div>
  );
};

export default NotFound;
