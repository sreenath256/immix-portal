import React, { useState } from "react";
import { MoreVertical, ChevronUp, ChevronDown } from "lucide-react";
import Pagination from "../components/ui/Pagination";

// Utility: Export to CSV
const exportToCSV = (data, filename = "data-center-report.csv") => {
  const csvHeader = ["Data Center", "Client", "Hours", "Price/Hour", "Total"];
  const csvRows = [
    csvHeader.join(","),
    ...data.map(
      (row) =>
        `${row.dataCenter},${row.client},${row.hours},${row.pricePerHour},${row.totalPrice}`
    ),
  ];
  const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(csvData);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

const DataCenterWorkSummary = () => {
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

  // Sample data (with totalPrice calculated)
  const rawData = [
    { id: 1, dataCenter: "Data Center A", client: "ABC Corp", hours: 15, pricePerHour: 50 },
    { id: 2, dataCenter: "Data Center A", client: "XYZ Ltd", hours: 20, pricePerHour: 55 },
    { id: 3, dataCenter: "Data Center B", client: "TechWorld", hours: 18, pricePerHour: 60 },
    { id: 4, dataCenter: "Data Center C", client: "InnovaSoft", hours: 12, pricePerHour: 48 },
    { id: 5, dataCenter: "Data Center D", client: "NextGen", hours: 25, pricePerHour: 52 },
    { id: 6, dataCenter: "Data Center A", client: "GlobalTech", hours: 10, pricePerHour: 45 },
    { id: 7, dataCenter: "Data Center B", client: "SkyNet", hours: 22, pricePerHour: 58 },
    { id: 8, dataCenter: "Data Center C", client: "BlueWave", hours: 16, pricePerHour: 53 },
    { id: 9, dataCenter: "Data Center D", client: "AlphaSoft", hours: 30, pricePerHour: 50 },
    { id: 10, dataCenter: "Data Center A", client: "CodeHub", hours: 14, pricePerHour: 47 },
    { id: 11, dataCenter: "Data Center B", client: "DataWorks", hours: 19, pricePerHour: 59 },
    { id: 12, dataCenter: "Data Center C", client: "CyberNet", hours: 17, pricePerHour: 62 },
    { id: 13, dataCenter: "Data Center D", client: "FusionTech", hours: 21, pricePerHour: 55 },
    { id: 14, dataCenter: "Data Center A", client: "NextLevel", hours: 11, pricePerHour: 49 },
    { id: 15, dataCenter: "Data Center B", client: "Infinity", hours: 23, pricePerHour: 57 },
    { id: 16, dataCenter: "Data Center C", client: "Quantum", hours: 20, pricePerHour: 60 },
    { id: 17, dataCenter: "Data Center D", client: "NovaCorp", hours: 28, pricePerHour: 52 },
    { id: 18, dataCenter: "Data Center A", client: "Matrix", hours: 13, pricePerHour: 46 },
    { id: 19, dataCenter: "Data Center B", client: "VisionSoft", hours: 24, pricePerHour: 61 },
    { id: 20, dataCenter: "Data Center C", client: "LogicPro", hours: 19, pricePerHour: 54 },
    { id: 21, dataCenter: "Data Center D", client: "Zenith", hours: 26, pricePerHour: 56 },
    { id: 22, dataCenter: "Data Center A", client: "CoreTech", hours: 15, pricePerHour: 48 },
    { id: 23, dataCenter: "Data Center B", client: "EdgeNet", hours: 22, pricePerHour: 63 },
    { id: 24, dataCenter: "Data Center C", client: "OmniSoft", hours: 18, pricePerHour: 50 },
    { id: 25, dataCenter: "Data Center D", client: "Hyperion", hours: 29, pricePerHour: 55 },
    { id: 26, dataCenter: "Data Center A", client: "BrightWorks", hours: 16, pricePerHour: 47 },
    { id: 27, dataCenter: "Data Center B", client: "TitanSoft", hours: 27, pricePerHour: 59 },
    { id: 28, dataCenter: "Data Center C", client: "GalaxyNet", hours: 21, pricePerHour: 53 },
    { id: 29, dataCenter: "Data Center D", client: "PrimeTech", hours: 30, pricePerHour: 60 },
    { id: 30, dataCenter: "Data Center A", client: "OrbitSoft", hours: 12, pricePerHour: 49 },
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

  // Pagination logic
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
        <h2 className="text-2xl font-semibold">Work Summary by Data Centers</h2>
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
            onClick={() => exportToCSV(rawData)}
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
              <th className="p-2 cursor-pointer" onClick={() => handleSort("dataCenter")}>
                Data Center {renderSortIcon("dataCenter")}
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
                <td className="p-2">{row.dataCenter}</td>
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

export default DataCenterWorkSummary;
