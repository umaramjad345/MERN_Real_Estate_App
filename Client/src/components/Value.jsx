import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { MdCancel, MdAnalytics } from "react-icons/md";

const data = [
  {
    icon: <HiShieldCheck />,
    heading: "Best interest rates on the market",
    detail:
      "Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.",
  },
  {
    icon: <MdCancel />,
    heading: "Prevent unstable prices",
    detail:
      "Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.",
  },
  {
    icon: <MdAnalytics />,
    heading: "Best price on the market",
    detail:
      "Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.",
  },
];

const Value = () => {
  return (
    <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-center py-12 my-28">
      <div className="md:w-1/2">
        <div>
          <img src="./value.png" alt="" className="w-full" />
        </div>
      </div>

      <div className="md:w-1/2 md:pl-8">
        <div className="text-gray-600 dark:text-gray-100 text-3xl font-bold mb-2 py-2">
          We Value Your Comfort !
        </div>
        <span className="text-gray-600 dark:text-gray-100">
          We are always ready to help by providing the best services for you.
          <br />
          Because, We believe a good place to live can make your life better.
        </span>

        <Accordion
          className="mt-8"
          allowMultipleExpanded={false}
          preExpanded={[0]}
        >
          {data.map((item, i) => {
            const [isExpanded, setIsExpanded] = useState(false);
            return (
              <AccordionItem key={i}>
                <AccordionItemHeading>
                  <AccordionItemButton
                    className={`flex items-center justify-between bg-gray-100 py-4 px-6 rounded-md border border-gray-200 ${
                      isExpanded ? "shadow-md" : ""
                    }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-100 text-gray-600 p-2 mr-4">
                        {item.icon}
                      </div>
                      <span className="text-gray-600">{item.heading}</span>
                    </div>
                    <MdOutlineArrowDropDown
                      size={20}
                      className={`transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p className="text-gray-600 dark:text-gray-100">
                    {item.detail}
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Value;
