import React, { useState } from "react";
import { MoreVertical, ChevronUp, ChevronDown } from "lucide-react";
import Pagination from "../components/ui/Pagination";

// Utility: Export to CSV
const exportToCSV = (data, dateRange) => {
  const csvHeader = ["Technician", "Hours", "Price/Hour", "Total"];
  const csvRows = [
    csvHeader.join(","),
    ...data.map(
      (row) =>
        `${row.technician},${row.client},${row.dataCenter},${row.hours},${row.pricePerHour},${row.totalPrice}`
    ),
  ];
  const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(csvData);
  const a = document.createElement("a");
  a.href = url;
  a.download = `technician-report_${dateRange.start}_to_${dateRange.end}.csv`;
  a.click();
};

const TechnicianWorkSummary = () => {
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

  // Sample data with 30+ entries
  const rawData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    technician: `Technician ${i + 1}`,
    client: `Client ${i + 1}`,
    dataCenter: `Data Center ${String.fromCharCode(65 + (i % 4))}`, // A, B, C, D
    hours: Math.floor(Math.random() * 20) + 5,
    pricePerHour: Math.floor(Math.random() * 50) + 40,
  })).map((item) => ({
    ...item,
    totalPrice: item.hours * item.pricePerHour,
  }));

  // Sorting
  const sortedData = [...rawData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
    setCurrentPage(1);
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
        <h2 className="text-2xl font-semibold">Work Summary by Field Technicians</h2>
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
              <th className="p-2 cursor-pointer" onClick={() => handleSort("technician")}>
                Technician {renderSortIcon("technician")}
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
                <td className="p-2">{row.technician}</td>
     
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
        totalPages={totalPages}
      />
    </div>
  );
};

export default TechnicianWorkSummary;
