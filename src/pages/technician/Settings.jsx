import React, { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    password: "",
    confirmPassword: "",
    profileImage:
      "https://cdn.vectorstock.com/i/500p/54/17/gray-man-placeholder-photo-vector-24005417.jpg",
  });

  const [preview, setPreview] = useState(formData.profileImage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Technician Settings
      </h2>

      {/* Profile Settings Section */}
      <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 border border-gray-200">
        <h3 className="text-lg font-medium mb-5 text-center sm:text-left">
          Profile Settings
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-5 gap-3">
            <img
              src={preview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border shadow-sm"
            />
            <div className="text-center sm:text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Change Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center sm:text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
