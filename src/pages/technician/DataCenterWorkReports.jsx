import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import WorkDetailModal from "./WorkDetailModal";
import BillViewer from "@/components/ui/BillViewer";
import Pagination from "@/components/ui/Pagination";
import WorkFormModal from "./WorkFormModal";

const DataCenterWorkReports = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  // Modals
  const [billModal, setBillModal] = useState({ open: false, bills: [] });
  const [detailModal, setDetailModal] = useState(null);
  const [formModal, setFormModal] = useState({ open: false, data: null });

  // Dummy Data
  useEffect(() => {
    const dummy = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      date: `2025-09-${String((i % 30) + 1).padStart(2, "0")}`,
      client: i % 2 === 0 ? "ABC Corp" : "XYZ Ltd",
      dataCenter: `Data Center ${(i % 5) + 1}`,
      workers: (i % 5) + 1,
      hours: (i % 8) + 1,
      bills: i % 3 === 0 ? ["https://via.placeholder.com/300"] : [],
      createdAt: `2025-09-${String((i % 30) + 1).padStart(2, "0")}T10:00:00`,
      updatedAt: `2025-09-${String((i % 30) + 1).padStart(2, "0")}T14:00:00`,
    }));
    setRecords(dummy);
  }, []);

  // Filtering
  useEffect(() => {
    const filtered = records.filter((r) => {
      const recordDate = new Date(r.date);
      return (
        recordDate >= dateRange.start &&
        recordDate <= dateRange.end &&
        (r.client.toLowerCase().includes(search.toLowerCase()) ||
          r.dataCenter.toLowerCase().includes(search.toLowerCase()))
      );
    });
    setFilteredRecords(filtered);
    setCurrentPage(1);
  }, [records, search, dateRange]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold">Work Reports - Data Center</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="date"
            value={format(dateRange.start, "yyyy-MM-dd")}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: new Date(e.target.value) })
            }
            className="border rounded p-2"
          />
          <input
            type="date"
            value={format(dateRange.end, "yyyy-MM-dd")}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: new Date(e.target.value) })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Search client or data center..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={() => setFormModal({ open: true, data: null })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Work
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Data Center</th>
              <th className="p-2 border">Workers</th>
              <th className="p-2 border">Hours</th>
              <th className="p-2 border">Bills</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.date}</td>
                <td className="p-2 border">{r.client}</td>
                <td className="p-2 border">{r.dataCenter}</td>
                <td className="p-2 border">{r.workers}</td>
                <td className="p-2 border">{r.hours}</td>
                <td className="p-2 border text-center">
                  {r.bills.length > 0 ? (
                    <button
                      className="text-blue-600 underline"
                      onClick={() =>
                        setBillModal({ open: true, bills: r.bills })
                      }
                    >
                      View Bills
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="text-green-600 underline"
                    onClick={() => setDetailModal(r)}
                  >
                    View
                  </button>
                  <button
                    className="text-indigo-600 underline"
                    onClick={() => setFormModal({ open: true, data: r })}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {indexOfFirstRecord + 1} -{" "}
          {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
          {filteredRecords.length}
        </p>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredRecords.length}
          itemsPerPage={recordsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <BillViewer
        bills={billModal.bills}
        open={billModal.open}
        onClose={() => setBillModal({ open: false, bills: [] })}
      />
      <WorkDetailModal data={detailModal} onClose={() => setDetailModal(null)} />

      <WorkFormModal
        open={formModal.open}
        data={formModal.data}
        onClose={() => setFormModal({ open: false, data: null })}
        onSave={(form, mode) => {
          if (mode === "add") {
            setRecords([...records, { ...form, id: Date.now() }]);
          } else {
            setRecords(
              records.map((r) =>
                r.id === formModal.data.id ? { ...r, ...form } : r
              )
            );
          }
        }}
      />
    </div>
  );
};

export default DataCenterWorkReports;
