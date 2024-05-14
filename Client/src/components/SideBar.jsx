import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";

const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:4000/api/v1/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signOutUserFailure(data));
        toast.error(data);
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col">
          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=dashboard"}>
              <div className="flex items-center gap-6 rounded-full py-2 px-4 bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-xl">
                    <MdDashboard />
                  </span>
                  <span className="text-lg">Dashboard</span>
                </div>
                <label className="px-2 rounded-full font-semibold">
                  {currentUser?.isAdmin && "Admin"}
                </label>
              </div>
            </Link>
          )}

          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=all-listings"}>
              <div className="flex items-center gap-6 rounded-full py-2 px-4 bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-xl">
                    <CiCircleList />
                  </span>
                  <span className="text-lg">All Listings</span>
                </div>
              </div>
            </Link>
          )}
          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
              <div className="flex items-center gap-6 rounded-full py-2 px-4  bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-xl">
                    <FaUsers />
                  </span>
                  <span className="text-lg">Users</span>
                </div>
              </div>
            </Link>
          )}

          <div
            className="flex items-center gap-6 rounded-full py-2 px-4  bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300"
            onClick={handleSignOut}
          >
            <div className="flex items-center gap-4">
              <span className="text-xl">
                <HiArrowSmRight />
              </span>
              <span className="text-lg">Sign Out</span>
            </div>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
