import React, { useEffect, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import DashCard from "./DashCard";
import Charts from "./Charts";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/v1/listing/dashboard",
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (res.ok) {
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser?.isAdmin) {
      fetchData();
    }
  }, [currentUser?._id]);

  const stats = [
    {
      id: 1,
      icon: <FaUsers />,
      label: "Total Users",
      text: "Users",
      count: data?.userCount,
    },
    {
      id: 2,
      icon: <CiCircleList />,
      label: "Total Listings",
      text: "Listings",
      count: data?.listingCount,
    },
  ];
  const chartData = [
    {
      name: "Properties",
      Rent: data?.rentListingCount,
      Sale: data?.saleListingCount,
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full p-2 my-4 flex items-center gap-4">
        {stats.map(({ id, label, icon, count, text }) => (
          <DashCard
            key={id}
            label={label}
            icon={icon}
            count={count}
            text={text}
          />
        ))}
      </div>
      <div className="w-full my-8">
        <h2 className="text-gray-600 dark:text-gray-100 text-2xl font-bold mx-6 my-5">
          Property Chart
        </h2>
        <Charts data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
