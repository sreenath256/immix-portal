import { Outlet } from "react-router-dom";
import TechnicianBottomNav from "../layouts/TechnicianBottomNav";

function TechnicianLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-14 bg-blue-600 text-white flex items-center px-4 shadow">
        <h1 className="font-semibold text-lg">Technician Dashboard</h1>
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
