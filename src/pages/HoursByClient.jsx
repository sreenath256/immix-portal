import React, { useState } from "react";
import { MoreVertical, ChevronUp, ChevronDown } from "lucide-react";
import Pagination from "../components/ui/Pagination";

// Utility: Export to CSV with date range
const exportToCSV = (data, dateRange, filename = "hours-by-client") => {
  const csvHeader = ["Client", "Hours", "Price/Hour", "Total"];
  const csvRows = [
    csvHeader.join(","),
    ...data.map(
      (row) =>
        `${row.client},${row.hours},${row.pricePerHour},${row.totalPrice}`
    ),
  ];
  const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(csvData);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}_${dateRange.start}_to_${dateRange.end}.csv`;
  a.click();
};

const HoursByClient = () => {
  const [dateRange, setDateRange] = useState({
    start: "2025-09-01",
    end: "2025-09-25",
  });

  const [sortConfig, setSortConfig] = useState({
    key: "hours",
    direction: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sample Data
  const rawData = [
    { id: 1, client: "ABC Corp", hours: 55, pricePerHour: 50 },
    { id: 2, client: "XYZ Ltd", hours: 70, pricePerHour: 55 },
    { id: 3, client: "TechWorld", hours: 45, pricePerHour: 60 },
    { id: 4, client: "InnovaSoft", hours: 30, pricePerHour: 48 },
    { id: 5, client: "NextGen", hours: 82, pricePerHour: 52 },
    { id: 6, client: "GlobalTech", hours: 25, pricePerHour: 45 },
    { id: 7, client: "SkyNet", hours: 92, pricePerHour: 58 },
    { id: 8, client: "BlueWave", hours: 50, pricePerHour: 53 },
    { id: 9, client: "AlphaSoft", hours: 120, pricePerHour: 50 },
    { id: 10, client: "CodeHub", hours: 35, pricePerHour: 47 },
    { id: 11, client: "DataWorks", hours: 88, pricePerHour: 59 },
    { id: 12, client: "CyberNet", hours: 40, pricePerHour: 62 },
    { id: 13, client: "FusionTech", hours: 69, pricePerHour: 55 },
    { id: 14, client: "NextLevel", hours: 28, pricePerHour: 49 },
    { id: 15, client: "Infinity", hours: 95, pricePerHour: 57 },
    { id: 16, client: "Quantum", hours: 73, pricePerHour: 60 },
    { id: 17, client: "NovaCorp", hours: 110, pricePerHour: 52 },
    { id: 18, client: "Matrix", hours: 38, pricePerHour: 46 },
    { id: 19, client: "VisionSoft", hours: 101, pricePerHour: 61 },
    { id: 20, client: "LogicPro", hours: 85, pricePerHour: 54 },
  ].map((item) => ({
    ...item,
    totalPrice: item.hours * item.pricePerHour,
  }));

  // Sorting logic
  const sortedData = [...rawData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Hours by Client</h2>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="border rounded-lg p-2 text-sm"
          />
          <span>-</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="border rounded-lg p-2 text-sm"
          />
          <button
            onClick={() => exportToCSV(rawData, dateRange)}
            className="ml-4 flex items-center gap-2 border rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
          >
            <MoreVertical size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 cursor-pointer" onClick={() => handleSort("client")}>
                Client {renderSortIcon("client")}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("hours")}>
                Hours {renderSortIcon("hours")}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("pricePerHour")}>
                Price / Hour {renderSortIcon("pricePerHour")}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("totalPrice")}>
                Total Price {renderSortIcon("totalPrice")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{row.client}</td>
                <td className="p-2">{row.hours}</td>
                <td className="p-2">₹{row.pricePerHour}</td>
                <td className="p-2 font-semibold">₹{row.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HoursByClient;
