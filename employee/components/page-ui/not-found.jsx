import React from "react";

interface NotFoundProps {
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <div className=" w-full flex flex-col items-center justify-center h-screen">
      <p className="text-xl mt-4">{message || "No content found."}</p>
    </div>
  );
};

export default NotFound;
