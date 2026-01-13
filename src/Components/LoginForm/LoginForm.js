import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from './images/bg-image.jpeg';

const LoginForm = () => {
  const navigate = useNavigate();
 React.useEffect(() => {
  const message = localStorage.getItem("redirectMessage");
 if (message) {
  localStorage.removeItem("redirectMessage"); // Clear first
  setTimeout(() => {
    toast.warning(message);
  }, 100);
}

}, []);


  

  const [formData, setFormData] = useState({
    userIdentifier: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    } else if (
      name === "userIdentifier" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) &&
      value.length < 3
    ) {
      error = "Enter a valid email or username";
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "remember") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        userIdentifier: formData.userIdentifier,
        password: formData.password,
      });

      toast.success(res.data.message || "Login successful 🎉");

      // Optionally store token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Reset form
      setFormData({ userIdentifier: "", password: "", remember: false });

      // Redirect after success (optional)
      // setTimeout(() => {
      //   navigate("/Frontend"); // change as per your route
      // }, 1000);
      // Reset form
setFormData({ userIdentifier: "", password: "", remember: false });

// Redirect after success
// setTimeout(() => {
//   const courseId = localStorage.getItem("redirectCourseId");
//   const action = localStorage.getItem("redirectAction");

//   if (courseId && action) {
//     localStorage.removeItem("redirectCourseId");
//     localStorage.removeItem("redirectAction");
//     navigate(`/CourseDetails/${courseId}`);
//   } else {
//     navigate("/Frontend");
//   }
// }, 1000);

//old
// setTimeout(() => {
//   const loggedInUser = JSON.parse(localStorage.getItem("user"));

//   if (loggedInUser?.role === "admin") {
//     navigate("/AdminPanel", { replace: true }); // Prevents going back to LoginForm
//   } else {
//     const courseId = localStorage.getItem("redirectCourseId");
//     const action = localStorage.getItem("redirectAction");

//     if (courseId && action) {
//       localStorage.removeItem("redirectCourseId");
//       localStorage.removeItem("redirectAction");
//       navigate(`/CourseDetails/${courseId}`);
//     } else {
//       navigate("/Frontend");
//     }
//   }
// }, 1000);
//new
setTimeout(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!loggedInUser) {
    navigate("/LoginForm");
    return;
  }

  if (loggedInUser.role === "superadmin") {
    navigate("/superadmin", { replace: true }); 
  } else if (loggedInUser.role === "admin") {
    navigate("/AdminPanel", { replace: true });
  } else if (loggedInUser.role === "instructor") {
    navigate("/Instructor", { replace: true });  
  } else {
    // normal student user
    const courseId = localStorage.getItem("redirectCourseId");
    const action = localStorage.getItem("redirectAction");

    if (courseId && action) {
      localStorage.removeItem("redirectCourseId");
      localStorage.removeItem("redirectAction");
      // navigate(`/CourseDetails/${courseId}`);
      navigate("/AllCourses");
    } else {
      navigate("/Frontend");
    }
  }
}, 1000);


    } catch (error) {
      console.error("Login failed:", error);
      const message =
        error.response?.data?.message || "Invalid credentials or server error";
      toast.error(message);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
       {/* Banner Section */}
      <section
        className="relative bg-cover bg-center py-24 text-center overflow-hidden font-quicksand"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
        <div className="absolute top-10 right-10 text-purple-700 text-4xl z-10">*</div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">Login</h1>
          <div className="inline-block bg-[#FFA722] text-white px-6 py-2 rounded-full font-medium shadow-md">
            Home <span className="mx-1">»</span> Login
          </div>
        </div>
      </section>
      {/* <h2 className="text-2xl font-semibold text-center text-black mt-6 mb-4">
        Student Login
      </h2> */}
      <div className="flex items-center justify-center  font-quicksand p-8 ">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Hi, Welcome back!</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username or Email */}
            <div>
              <input
                type="text"
                name="userIdentifier"
                placeholder="Username or Email Address"
                value={formData.userIdentifier}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.userIdentifier ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.userIdentifier
                    ? "focus:ring-red-400"
                    : "focus:ring-blue-500"
                } placeholder-gray-500`}
              />
              {errors.userIdentifier && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userIdentifier}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-400"
                    : "focus:ring-blue-500"
                } placeholder-gray-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Checkbox + Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span>Keep me signed in</span>
              </label>
              <Link to="#" className="text-gray-600 hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md font-semibold tracking-wide hover:bg-blue-900 transition"
            >
              SIGN IN
            </button>

            {/* Register Link */}
            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link
                to="/RegisterForm"
                className="text-blue-700 font-medium hover:underline"
              >
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
