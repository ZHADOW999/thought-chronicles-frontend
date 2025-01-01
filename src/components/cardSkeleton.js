import React from "react";

const CardSkeleton = () => {
  return (
    <div className="mt-5 animate-pulse p-4 rounded-lg shadow-md bg-white w-full flex  justify-between">
      {/* Profile Picture Placeholder */}
      <div className="w-[70%] md:w-[50%]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="ml-4 flex items-center justify-center gap-5">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded "></div>
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
      <div className="mt-4 md:w-60 md:h-44 w-24 h-16 bg-gray-300 rounded"></div>


    </div>
  );
};

export default CardSkeleton;
