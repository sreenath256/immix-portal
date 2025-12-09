import React, { useState } from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const WorkSummary = () => {
    const navigate = useNavigate();

    // Date range
    const [dateRange, setDateRange] = useState({
        start: "2025-09-01",
        end: "2025-09-25",
    });

    // Summary
    const [summary] = useState({
        totalWorkLogs: 125,
        totalHours: 540,
        technicians: 18,
        clients: 12,
    });

    // Data
    const [clientData] = useState([
        { id: 1, name: "ABC Corp", hours: 120 },
        { id: 2, name: "XYZ Ltd", hours: 85 },
        { id: 3, name: "TechWorld", hours: 60 },
        { id: 4, name: "Others", hours: 275 },
    ]);

    const [dataCenterData] = useState([
        { id: 1, name: "Data Center A", hours: 200 },
        { id: 2, name: "Data Center B", hours: 150 },
        { id: 3, name: "Data Center C", hours: 120 },
        { id: 4, name: "Data Center D", hours: 70 },
    ]);

    const [technicianData] = useState([
        { id: 1, technician: "John Doe", hours: 75 },
        { id: 2, technician: "Jane Smith", hours: 65 },
        { id: 3, technician: "Mike Johnson", hours: 55 },
        { id: 4, technician: "Sara Lee", hours: 45 },
        { id: 5, technician: "Alex Brown", hours: 40 },
    ]);

    const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-semibold"></h2>

                {/* Date Range Selector */}
                <div className="flex gap-2 items-center">
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, start: e.target.value })
                        }
                        className="border rounded-lg p-2 text-sm"
                    />
                    <span>-</span>
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, end: e.target.value })
                        }
                        className="border rounded-lg p-2 text-sm"
                    />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow rounded-2xl p-4">
                    <h3 className="text-sm text-gray-500">Total Work Logs</h3>
                    <p className="text-2xl font-bold">{summary.totalWorkLogs}</p>
                </div>
                <div className="bg-white shadow rounded-2xl p-4">
                    <h3 className="text-sm text-gray-500">Total Hours</h3>
                    <p className="text-2xl font-bold">{summary.totalHours}</p>
                </div>
                <div className="bg-white shadow rounded-2xl p-4">
                    <h3 className="text-sm text-gray-500">Technicians Active</h3>
                    <p className="text-2xl font-bold">{summary.technicians}</p>
                </div>
                <div className="bg-white shadow rounded-2xl p-4">
                    <h3 className="text-sm text-gray-500">Clients Served</h3>
                    <p className="text-2xl font-bold">{summary.clients}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Bar Chart */}
                <div className="bg-white shadow rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Hours by Data Center</h3>
                        <button
                            onClick={() => navigate("/work-summary/datacenters")}
                            className="text-sm text-green-600 hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataCenterData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hours" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white shadow rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Hours by Client</h3>
                        <button
                            onClick={() => navigate("/work-summary/clients")}
                            className="text-sm text-green-600 hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={clientData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="hours"
                            >
                                {clientData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Work by Technician */}
            <div className="bg-white shadow rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Work by Field Technician</h3>
                    <button
                        onClick={() => navigate("/work-summary/technicians")}
                        className="text-sm text-green-600 hover:underline"
                    >
                        View All
                    </button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">Technician</th>
                            <th className="p-2">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicianData.slice(0, 5).map((tech) => (
                            <tr key={tech.id} className="border-b">
                                <td className="p-2">{tech.technician}</td>
                                <td className="p-2">{tech.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSummary;
