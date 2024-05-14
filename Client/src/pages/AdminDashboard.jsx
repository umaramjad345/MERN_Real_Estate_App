import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard.jsx";
import AllListings from "../components/AllListings.jsx";
import Users from "../components/Users.jsx";
import SideBar from "../components/SideBar.jsx";

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");

    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-80">
          <SideBar />
        </div>
        {tab === "dashboard" && <Dashboard />}
        {tab === "all-listings" && <AllListings />}
        {tab === "users" && <Users />}
      </div>
    </>
  );
};

export default AdminDashboard;
