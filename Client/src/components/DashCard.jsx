import React from "react";
import { Card } from "flowbite-react";

const DashCard = ({ label, icon, count, text }) => {
  return (
    <Card className="w-full bg-gray-200 text-gray-600 dark:text-gray-100 shadow-lg rounded-xl flex flex-col items-start justify-between">
      <div className="flex items-center justify-between gap-2">
        <span
          className={
            "w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 border-gray-600 dark:border-gray-100"
          }
        >
          {icon}
        </span>
        <p className="text-xl font-medium">{label}</p>
      </div>
      <p className="text-lg font-semibold">
        {count} {text}
      </p>
      <span className="text-sm text-nowrap">{"110 last month"}</span>
    </Card>
  );
};

export default DashCard;
