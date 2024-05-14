import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="max-w-6xl w-full mx-auto flex gap-6 items-center justify-between my-6 p-4">
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-gray-600 dark:text-gray-100 font-bold text-xl md:text-2xl lg:text-6xl text-nowrap">
          Prime Estate
        </h1>
        <h1 className="text-gray-600 dark:text-gray-100 font-light text-lg md:text-xl lg:text-3xl my-2 lg:my-7">
          Where Every Place Tells a Story
        </h1>
        <Link
          to={"/search"}
          className="text-[8px] md:text-[12px] lg:text-[15px] text-gray-600 dark:text-gray-100 font-bold hover:underline"
        >
          Let's embark on this exciting adventure together!
        </Link>
      </div>
      <div className="p-2">
        {theme === "light" ? (
          <img
            src="./hero-image-1.png"
            className="object-cover w-full h-full z-0"
            alt="Background"
          />
        ) : (
          <img
            src="./hero-image.png"
            className="object-cover w-full h-full z-0"
            alt="Background"
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
