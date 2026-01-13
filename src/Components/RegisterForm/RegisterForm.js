import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import registerImage from "./images/image.avif";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  // ✅ Field validation
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "userName":
        if (!value.trim()) error = "This field is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Minimum 6 characters";
        break;
      case "confirmPassword":
        if (!value.trim()) error = "Confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ✅ API integrated form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.userName, // ✅ map correctly
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        toast.success(response.data.message || "Registered successfully ✅");

        setFormData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
         // ✅ Redirect to login after success
      setTimeout(() => {
        navigate("/LoginForm");
      }, 1000);
      } catch (error) {
        console.error("Registration Error:", error);
        const message =
          error.response?.data?.message || "Registration failed. Try again.";
        toast.error(message);
      }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-semibold text-center text-black mt-6 mb-4">
        Registration
      </h2>

      <div className="min-h-screen flex justify-center items-center bg-white px-4 font-quicksand">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-x-10 bg-white overflow-hidden p-4">
          {/* Left Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={registerImage}
              alt="Register"
              className="w-full sm:h-[550px] h-full rounded-lg object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="md:w-1/2 w-full bg-gradient-to-br from-blue-200 to-indigo-300 p-8 rounded-lg">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {[
                { name: "firstName", label: "First Name", type: "text" },
                { name: "lastName", label: "Last Name", type: "text" },
                { name: "userName", label: "User Name", type: "text" },
                { name: "email", label: "E-Mail", type: "email" },
                { name: "password", label: "Password", type: "password" },
                {
                  name: "confirmPassword",
                  label: "Password Confirmation",
                  type: "password",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors[field.name]
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-500"
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-md text-sm font-semibold tracking-wider hover:bg-blue-900 transition"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;


