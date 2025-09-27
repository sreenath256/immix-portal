import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

// Technician pages
import TechnicianHome from "./pages/technician/TechnicianHome";
import DataCenterWorkReports from "./pages/technician/DataCenterWorkReports";
import WorkSummary from "./pages/WorkSummery";
import DataCenterWorkSummary from "./pages/DataCenterWorkSummary";
import HoursByClient from "./pages/HoursByClient";
import WorkByTechnician from "./pages/WorkByTechnician";

// Fallback page
const NotFound = () => <div className="p-4">Page not found / Unauthorized</div>;

function App() {
  // Role state (admin / technician)
  const [role, setRole] = useState("admin"); // default technician

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles.includes(role)) {
      // Redirect based on role
      if (role === "admin") return <Navigate to="/" replace />;
      if (role === "technician") return <Navigate to="/technician" replace />;
      return <Navigate to="/notfound" replace />;
    }
    return children;
  };

  return (
    <>
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
          <Route path="/countries" element={<CountriesList />} />
          <Route path="/datacenters" element={<DataCenter />} />
          <Route path="/technicians" element={<FieldTechnicians />} />
          <Route path="/daily-work" element={<DailyWorkEntry />} />
          <Route path="/work-summary" element={<WorkSummary />} />
          <Route path="/work-summary/datacenters" element={<DataCenterWorkSummary />} />
          <Route path="/work-summary/clients" element={<HoursByClient />} />
          <Route path="/work-summary/technicians" element={<WorkByTechnician />} />
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
          <Route path="/technician/data-center/:id" element={<DataCenterWorkReports />} />
          <Route path="/technician/data-centers" element={<TechnicianHome />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
