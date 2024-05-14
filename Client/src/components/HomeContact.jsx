import React from "react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const HomeContact = () => {
  return (
    <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between py-12 my-28">
      {/* left side */}
      <div className="w-full">
        <div className="flex flex-col items-start md:gap-4">
          <span className="text-gray-600 dark:text-gray-100 text-4xl font-bold mb-2">
            Contact Us
          </span>
          <span className="text-gray-600 dark:text-gray-100 text-xl font-semibold mb-2">
            Contact Us Anytime!
          </span>
          <span className="text-gray-600 dark:text-gray-100">
            Because, We are always ready to help by providing the best services
            for you. We believe a good place to live can make your life better.
          </span>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* first row */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <MdCall size={25} className="text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-100 font-semibold">
                    Call
                  </span>
                  <span className="text-gray-600 dark:text-gray-100">
                    021 123 145 14
                  </span>
                </div>
              </div>
              <button className="w-full rounded-full py-2 px-4  bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                Call Now
              </button>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <BsFillChatDotsFill size={25} className="text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-100 font-semibold">
                    Chat
                  </span>
                  <span className="text-gray-600">021 123 145 14</span>
                </div>
              </div>
              <button className="w-full rounded-full py-2 px-4  bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                Chat Now
              </button>
            </div>
          </div>

          {/* second row */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <BsFillChatDotsFill size={25} className="text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-100 font-semibold">
                    Video Call
                  </span>
                  <span className="text-gray-600">021 123 145 14</span>
                </div>
              </div>
              <button className="w-full rounded-full py-2 px-4  bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                Video Call
              </button>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <HiChatBubbleBottomCenter size={25} className="text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-100 font-semibold">
                    Message
                  </span>
                  <span className="text-gray-600">021 123 145 14</span>
                </div>
              </div>
              <button className="w-full rounded-full py-2 px-4  bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                Message Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="w-full">
        <div className="w-1/2 flex flex-col md:flex-row">
          <img src="./contact-1.png" alt="" className="w-full" />
          <img src="./contact-2.png" alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
