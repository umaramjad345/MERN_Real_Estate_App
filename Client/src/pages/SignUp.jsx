import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";
import TextField from "@mui/material/TextField";
import { FloatingLabel } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingLabel
            variant="filled"
            label="Username"
            type="text"
            id="username"
            required
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
