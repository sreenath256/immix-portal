import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b shadow-sm flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
        
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        {/* <footer className="h-12 bg-white border-t shadow-sm flex items-center justify-center text-sm text-gray-500">
          © {new Date().getFullYear()} My App
        </footer> */}
      </div>
    </div>
  );
}

export default AdminLayout;
