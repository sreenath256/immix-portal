import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 bg-white border-b shadow-sm flex items-center px-4">
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </header>

        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="h-12 bg-white border-t shadow-sm flex items-center justify-center text-sm text-gray-500">
          © {new Date().getFullYear()} My App
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
