import React from "react";

const GetStarted = () => {
  return (
    <div className="bg-blue-600 py-28">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center gap-6 bg-blue-600 px-8 py-6 rounded-lg border-4 border-blue-500">
          <span className="text-gray-100 text-3xl font-semibold">
            Get Started With Prime Estate
          </span>
          <span className="text-gray-100">
            Subscribe Our Newsletter and Find Latest Properties
            <br />
            Make Your Life Comfortable
          </span>
          <a
            href="mailto:umarziaii345@gmail.com"
            className="inline-block bg-blue-800 text-gray-100 px-6 py-3 rounded-full hover:bg-blue-900 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
