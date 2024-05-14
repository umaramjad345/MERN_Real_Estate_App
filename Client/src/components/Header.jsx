import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaSun } from "react-icons/fa";
import { FiMenu, FiMoon, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { Avatar, Dropdown } from "flowbite-react";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [location.search]);

  const toggleMenu = () => {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:4000/api/v1/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserSuccess(error?.response?.data?.message));
    }
  };
  return (
    <header className="shadow-xl">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-4 xl:px-0">
        <Link to="/" className="flex items-center gap-2">
          <p className="w-12 h-12 bg-blue-600 bg-gradient-to-tl  from-blue-600 via-blue-800 to-blue-200 px-1 rounded-full text-gray-100 text-2xl font-bold flex items-center justify-center">
            P.
          </p>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl flex flex-wrap">
            <span className="text-blue-600 dark:text-gray-100 font-bold">
              Prime
            </span>
            <span className="text-blue-600 dark:text-gray-100 font-Normal">
              Estate
            </span>
          </h1>
        </Link>

        {/* Small Screen Right Section */}
        <div className="flex items-center gap-4 sm:hidden">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="Profile"
                  img={currentUser?.avatar}
                  rounded
                  className="oject-cover"
                />
              }
              className="rounded-lg"
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              <Link to={"/profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              {currentUser?.isAdmin && (
                <Link to={"/dashboard?tab=dashboard"}>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to={"/sign-in"}>
              <div className="px-2 py-1 rounded-lg bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                Sign In
              </div>
            </Link>
          )}
          <button
            className="p-2 border-2 text-blue-600 dark:text-gray-100 shadow-sm rounded-full cursor-pointer"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? (
              <FiMoon className="text-blue-600 dark:text-gray-100 hover:text-blue-400 text-lg" />
            ) : (
              <FaSun className="text-blue-600 dark:text-gray-100 hover:text-blue-400 text-lg" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="focus:outline-none text-blue-600 dark:text-gray-100"
            aria-label="Hamburger Menu"
          >
            {showMenu ? (
              <FiX className="text-3xl" />
            ) : (
              <FiMenu className="text-3xl" />
            )}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 dark:bg-gray-200 bg-opacity-20 dark:bg-opacity-10 p-3 rounded-full items-center hidden sm:flex sm:gap-2 shadow-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            className="text-blue-600 dark:text-gray-100 bg-transparent border-none outline-none focus:outline-none w-24 sm:w-48 md:w-64 lg:w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-blue-600 dark:text-gray-100" />
          </button>
        </form>

        {/* Large Screen Right Section */}
        <div className="hidden sm:flex gap-4 items-center justify-between">
          <Link
            to="/"
            className="text-left text-lg mx-2 py-2 text-blue-600 dark:text-gray-100 hover:underline"
            aria-label="Projects"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-left text-lg mx-2 py-2 text-blue-600 dark:text-gray-100 hover:underline"
            aria-label="Projects"
          >
            About
          </Link>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="Profile"
                  img={currentUser?.avatar}
                  rounded
                  className="oject-cover"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              <Link to={"/profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              {currentUser?.isAdmin && (
                <Link to={"/dashboard?tab=dashboard"}>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to={"/sign-in"}>
              <div className="px-2 py-1 rounded-lg bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20  transition-all duration-300">
                Sign In
              </div>
            </Link>
          )}
          <button
            className="p-2 border-2 border-blue-600 dark:border-gray-100 shadow-sm rounded-full cursor-pointer"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? (
              <FiMoon className="text-blue-600 dark:text-gray-100 hover:text-blue-400 text-lg" />
            ) : (
              <FaSun className="text-blue-600 dark:text-gray-100 hover:text-blue-400 text-lg" />
            )}
          </button>
        </div>
      </div>
      {/* Small Screen Links */}
      <div
        className={
          showMenu
            ? "flex flex-col justify-center items-start w-full p-4"
            : "hidden"
        }
      >
        <Link
          to="/"
          className="text-left text-lg mx-2 py-2 text-blue-600 dark:text-gray-100 hover:underline"
          aria-label="Projects"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-left text-lg mx-2 py-2 text-blue-600 dark:text-gray-100 hover:underline"
          aria-label="Projects"
        >
          About
        </Link>
      </div>
    </header>
  );
};

export default Header;
