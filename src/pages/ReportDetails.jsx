import Pagination from "@/components/ui/Pagination";
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import BillViewer from "../components/ui/BillViewer"; // adjust path if needed

const ReportsDetails = () => {
  const location = useLocation();
  const logs = location.state?.logs || [];

  // date range state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // show 20 logs per page

  // BillViewer state
  const [billViewerOpen, setBillViewerOpen] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);

  // filter logs by date range
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (!startDate && !endDate) return true;

      const logDate = new Date(log.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && logDate < start) return false;
      if (end && logDate > end) return false;

      return true;
    });
  }, [logs, startDate, endDate]);

  // calculate pagination
  const totalItems = filteredLogs.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Work Logs</h2>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1); // reset pagination
            }}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1); // reset pagination
            }}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {filteredLogs.length > 0 ? (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Date</th>
                <th className="p-2">Technician</th>
                <th className="p-2">Hours</th>
                <th className="p-2">Workers</th>
                <th className="p-2">Expenses ($)</th>
                <th className="p-2">Bill(s)</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="p-2">{log.id}</td>
                  <td className="p-2">{log.date}</td>
                  <td className="p-2">{log.technician || "N/A"}</td>
                  <td className="p-2">{log.hours || 0}</td>
                  <td className="p-2">{log.workers || 0}</td>
                  <td className="p-2">${log.expenses || 0}</td>
                  <td className="p-2">
                    {log.bills && log.bills.length > 0 ? (
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
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination below table */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />

          {/* Bill Viewer Modal */}
          <BillViewer
            bills={selectedBills}
            open={billViewerOpen}
            onClose={() => setBillViewerOpen(false)}
          />
        </>
      ) : (
        <p>No logs found for the selected date range.</p>
      )}
    </div>
  );
};

export default ReportsDetails;
