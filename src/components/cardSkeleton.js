import React from "react";

const CardSkeleton = () => {
  return (
    <div className="mt-10 animate-pulse p-4 rounded-lg shadow-md bg-white w-full flex  justify-between">
      {/* Profile Picture Placeholder */}
      <div className="w-[80%]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="ml-4">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded mt-1"></div>
            </div>
          </div>
    
          {/* Title Placeholder */}
          <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
    
          {/* Description Placeholder */}
          <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>

                {/* Icons Placeholder */}
      <div className="flex gap-5 mt-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      </div>

      {/* Thumbnail Placeholder */}
      <div className="mt-4 h-32 w-[30%] bg-gray-300 rounded"></div>


    </div>
  );
};

export default CardSkeleton;