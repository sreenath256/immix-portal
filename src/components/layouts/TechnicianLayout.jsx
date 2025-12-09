import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TechnicianBottomNav from "../layouts/TechnicianBottomNav";

function TechnicianLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: Add your logout logic here (clear tokens/session)
    console.log("Logout clicked");
    navigate("/login"); // redirect to login page
  };

  const handleProfileSettings = () => {
    navigate("/technician/settings"); // go to profile settings page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-14 bg-green-600 text-white flex items-center justify-between px-4 shadow relative">
        <h1 className="font-semibold text-lg">Technician Dashboard</h1>

        {/* Profile icon */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-green-600 font-bold hover:ring-2 hover:ring-white"
          >
            {/* Could replace with user image */}
            P
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-50">
              <button
                onClick={handleProfileSettings}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 pb-20"> {/* pb-20 leaves space for bottom nav */}
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <TechnicianBottomNav />
    </div>
  );
}

export default TechnicianLayout;
