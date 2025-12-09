import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";
import TechnicianLayout from "./components/layouts/TechnicianLayout";

// Admin pages
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import DataCenter from "./pages/DataCenter";
import FieldTechnicians from "./pages/FieldTechnicians";
import CitiesList from "./pages/Cities";
import CountriesList from "./pages/Countries";
import DailyWorkEntry from "./pages/DailyWorkEntry";
import WorkSummary from "./pages/WorkSummery";
import DataCenterWorkSummary from "./pages/DataCenterWorkSummary";
import HoursByClient from "./pages/HoursByClient";
import WorkByTechnician from "./pages/WorkByTechnician";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import ReportsDetails from "./pages/ReportDetails";

// Technician pages
import TechnicianHome from "./pages/technician/TechnicianHome";
import DataCenterWorkReports from "./pages/technician/DataCenterWorkReports";
import TechnicianSettings from "./pages/technician/Settings";
import TechnicianCompanies from "./pages/TechnicianCompanies";
import ClientEngineers from "./pages/ClientEngineers";

// Fallback page
const NotFound = () => <div className="p-4">Page not found / Unauthorized</div>;

function App() {
  // Role state
  const [role, setRole] = useState("admin"); // default: admin for demo

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles.includes(role)) {
      if (role === "admin") return <Navigate to="/" replace />;
      if (role === "technician") return <Navigate to="/technician" replace />;
      return <Navigate to="/notfound" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 🌟 Demo Role Switcher Bar (remove after giving to client if not needed) */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm">
        <span>
          Current Role:{" "}
          <strong className="capitalize text-yellow-300">{role}</strong>
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setRole("admin")}
            className={`px-3 py-1 rounded ${
              role === "admin"
                ? "bg-blue-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Switch to Admin
          </button>
          <button
            onClick={() => setRole("technician")}
            className={`px-3 py-1 rounded ${
              role === "technician"
                ? "bg-blue-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Switch to Technician
          </button>
        </div>
      </div>

      {/* App Routes */}
      <div className="flex-1">
        <Routes>
          {/* Admin routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/cities" element={<CitiesList />} />
            <Route path="/technician-companies" element={<TechnicianCompanies />} />
            <Route path="/countries" element={<CountriesList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/datacenters" element={<DataCenter />} />
            <Route path="/technicians" element={<FieldTechnicians />} />
            <Route path="/client-engineers" element={<ClientEngineers />} />
            <Route path="/daily-work" element={<DailyWorkEntry />} />
            <Route path="/work-summary" element={<WorkSummary />} />
            <Route
              path="/work-summary/datacenters"
              element={<DataCenterWorkSummary />}
            />
            <Route
              path="/work-summary/clients"
              element={<HoursByClient />}
            />
            <Route
              path="/work-summary/technicians"
              element={<WorkByTechnician />}
            />
            <Route path="/reports" element={<Reports />} />
            <Route path="/report/:name" element={<ReportsDetails />} />
          </Route>

          {/* Technician routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["technician"]}>
                <TechnicianLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/technician" element={<TechnicianHome />} />
            <Route
              path="/technician/data-center/:id"
              element={<DataCenterWorkReports />}
            />
            <Route
              path="/technician/data-centers"
              element={<TechnicianHome />}
            />
            <Route
              path="/technician/settings"
              element={<TechnicianSettings />}
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
