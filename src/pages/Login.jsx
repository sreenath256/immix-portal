import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  // Dummy login data
  const dummyUser = {
    username: "admin",
    password: "12345",
  };

  const onSubmit = (data) => {
    if (
      data.username === dummyUser.username &&
      data.password === dummyUser.password
    ) {
      alert("✅ Login successful!");
      setErrorMessage("");
    } else {
      setErrorMessage("❌ Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-gray-800">
      <Helmet>
        <title>Login | Immix Portal </title>
      </Helmet>
    
      
    </div>
  )
}

export default Login
