import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
import TextField from "@mui/material/TextField";
import { FloatingLabel } from "flowbite-react";

const SigIn = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:4000/api/v1/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="p-3 max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-start">
          <Link to="/" className="font-bold text-4xl flex items-center gap-2 ">
            <p className="w-16 h-16 bg-blue-600 bg-gradient-to-tl  from-blue-600 via-blue-800 to-blue-200 px-1 rounded-full text-white flex items-center justify-center">
              P.
            </p>
            <span className="font-bold text-blue-600 dark:text-gray-200 text-4xl text-nowrap">
              Prime Estate
            </span>
          </Link>
          <p className="text-md mt-2 text-gray-700 dark:text-gray-200">
            Discover Your Dream Home: Where Every Place Tells a Story
          </p>
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingLabel
            variant="filled"
            label="Email"
            type="email"
            id="email"
            required
            onChange={handleChange}
          />
          <FloatingLabel
            variant="filled"
            label="Password"
            type="password"
            id="password"
            required
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-blue-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't Have An Account</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default SigIn;
