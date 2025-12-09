import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillViewer from "../components/ui/BillViewer";

// Mock Data (replace later with API calls)
const clients = [
  { id: 1, name: "ABC Corp" },
  { id: 2, name: "XYZ Ltd" },
  { id: 3, name: "TechWorld" },
];

const dataCenters = [
  { id: 1, clientId: 1, name: "Data Center A", pricePerHour: 50 },
  { id: 2, clientId: 1, name: "Data Center B", pricePerHour: 60 },
  { id: 3, clientId: 2, name: "Data Center C", pricePerHour: 40 },
  { id: 4, clientId: 3, name: "Data Center D", pricePerHour: 55 },
];

const tasks = [
  "Server maintenance",
  "Network upgrade",
  "Cooling system check",
  "Database optimization",
  "Firewall setup",
  "Storage expansion",
  "Software patching",
  "Load balancer tuning",
];

const technicians = [
  "John Doe",
  "Jane Smith",
  "Mike Johnson",
  "Sara Lee",
  "Alex Brown",
  "Emily Davis",
  "Chris Martin",
  "Sophia Wilson",
];

// Inside your mock workLogs generation, add startTime and endTime
const workLogs = Array.from({ length: 240 }, (_, i) => {
  const dc = dataCenters[i % dataCenters.length];
  const client = clients.find((c) => c.id === dc.clientId);

  const month = 7 + (i % 6); // Jul - Dec
  const day = String((i % 28) + 1).padStart(2, "0");

  // Generate mock start/end times
  const startHour = Math.floor(Math.random() * 8) + 8; // 8 AM - 15 PM
  const startMinute = Math.floor(Math.random() * 60);
  const endHour = startHour + Math.floor(Math.random() * 4) + 1; // 1-4 hours later
  const endMinute = Math.floor(Math.random() * 60);

  const formatTime = (h, m) =>
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  return {
    id: i + 1,
    dataCenterId: dc.id,
    clientId: client.id,
    date: `2025-${String(month).padStart(2, "0")}-${day}`,
    task: tasks[i % tasks.length],
    hours: Math.floor(Math.random() * 8) + 1,
    technician: technicians[i % technicians.length],
    workers: Math.floor(Math.random() * 5) + 1, // mock workers
    expenses: Math.floor(Math.random() * 200) + 50, // mock expenses
    bills: `BILL-${i + 1000}`, // mock bill number
    startTime: formatTime(startHour, startMinute),
    endTime: formatTime(endHour, endMinute),
  };
});


const Reports = () => {
  const navigate = useNavigate();
  const [billViewerOpen, setBillViewerOpen] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: "2025-08-01",
    end: "2025-10-31",
  });

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDataCenter, setSelectedDataCenter] = useState("");

  // Filter datacenters based on client
  const filteredDataCenters = dataCenters.filter(
    (dc) => dc.clientId === Number(selectedClient)
  );

  // Logs filter (only when data center is selected)
  let filteredLogs = [];
  if (selectedDataCenter) {
    filteredLogs = workLogs.filter(
      (log) => log.date >= dateRange.start && log.date <= dateRange.end
    );

    if (selectedClient) {
      const clientDataCenters = dataCenters
        .filter((dc) => dc.clientId === Number(selectedClient))
        .map((dc) => dc.id);

      filteredLogs = filteredLogs.filter((log) =>
        clientDataCenters.includes(log.dataCenterId)
      );
    }

    filteredLogs = filteredLogs.filter(
      (log) => log.dataCenterId === Number(selectedDataCenter)
    );
  }

  // Summary calculation
  const totalLogs = filteredLogs.length;
  const totalHours = filteredLogs.reduce((acc, log) => acc + log.hours, 0);

  // Get selected DC price
  const selectedDC = dataCenters.find(
    (dc) => dc.id === Number(selectedDataCenter)
  );
  const totalCost = selectedDC ? selectedDC.pricePerHour * totalHours : 0;

  // Handle navigation
  const handleViewMore = () => {
    if (!selectedDataCenter) return;

    const dc = dataCenters.find((d) => d.id === Number(selectedDataCenter));
    if (dc) {
      navigate(`/report/${dc.name.replace(/\s+/g, "-").toLowerCase()}`, {
        state: { logs: filteredLogs, dataCenter: dc },
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Reports - Data Center Billing
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Client Select */}
        <select
          value={selectedClient}
          onChange={(e) => {
            setSelectedClient(e.target.value);
            setSelectedDataCenter(""); // reset DC when client changes
          }}
          className="border rounded-lg p-2"
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        {/* Data Center Select */}
        <select
          value={selectedDataCenter}
          onChange={(e) => setSelectedDataCenter(e.target.value)}
          className="border rounded-lg p-2"
          disabled={!selectedClient}
        >
          <option value="">All Data Centers</option>
          {filteredDataCenters.map((dc) => (
            <option key={dc.id} value={dc.id}>
              {dc.name}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="border rounded-lg p-2"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange({ ...dateRange, end: e.target.value })
          }
          className="border rounded-lg p-2"
        />
      </div>

      {/* Show summary & logs only if data center is selected */}
      {selectedDataCenter ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-2xl p-4">
              <h3 className="text-sm text-gray-500">Total Work Logs</h3>
              <p className="text-2xl font-bold">{totalLogs}</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4">
              <h3 className="text-sm text-gray-500">Total Hours</h3>
              <p className="text-2xl font-bold">{totalHours}</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4">
              <h3 className="text-sm text-gray-500">Total Cost</h3>
              <p className="text-2xl font-bold">
                ${totalCost.toLocaleString()}
              </p>

            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Work Logs</h3>
              {filteredLogs.length > 10 && (
                <button
                  onClick={handleViewMore}
                  className="px-4 py-2 text-blue-600"
                >
                  View More
                </button>
              )}
            </div>

            {filteredLogs.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">ID</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Technician</th>
                    <th className="p-2">Start Time</th>
                    <th className="p-2">End Time</th>
                    <th className="p-2">Hours</th>
                    <th className="p-2">Workers</th>
                    <th className="p-2">Expenses ($)</th>
                    <th className="p-2">Bill(s)</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="p-2">{log.id}</td>
                      <td className="p-2">{log.date}</td>
                      <td className="p-2">{log.technician}</td>
                      <td className="p-2">{log.startTime}</td>
                      <td className="p-2">{log.endTime}</td>
                      <td className="p-2">{log.hours}</td>
                      <td className="p-2">{log.workers}</td>
                      <td className="p-2">${log.expenses}</td>
                      <td className="p-2">
                        <button
                          onClick={() => {
                            setSelectedBills(
                              Array.isArray(log.bills) ? log.bills : [log.bills]
                            );
                            setBillViewerOpen(true);
                          }}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View Bills
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            ) : (
              <p className="text-gray-500">No logs found for this data center.</p>
            )}
          </div>
          <BillViewer
            bills={selectedBills}
            open={billViewerOpen}
            onClose={() => setBillViewerOpen(false)}
          />
        </>
      ) : (
        <p className="text-gray-400 italic">
          Please select a Data Center to view logs.
        </p>
      )}

    </div>
  );
};

export default Reports;
