import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AddDataCenter from "../components/ui/AddDataCenter";
import Pagination from "../components/ui/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DataCentersList() {
  // Generate 30 sample data centers
  const initialDataCenters = Array.from({ length: 30 }, (_, i) => ({
    id: `DC${1000 + i + 1}`,
    name: `Data Center ${i + 1}`,
    country: ["USA", "India", "UAE"][i % 3],
    city: ["New York", "San Francisco", "Kochi", "Dubai"][i % 4],
    client: ["Tech Solutions Ltd.", "Global IT Hub", "NextGen"][i % 3],
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  const [dataCenters, setDataCenters] = useState(initialDataCenters);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newDC, setNewDC] = useState({
    id: "",
    name: "",
    country: "",
    city: "",
    client: "",
    status: "Active",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter data centers
  const filteredDataCenters = dataCenters.filter((dc) => {
    const matchesSearch =
      dc.name.toLowerCase().includes(search.toLowerCase()) ||
      dc.city.toLowerCase().includes(search.toLowerCase()) ||
      dc.client.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || dc.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDataCenters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDataCenters = filteredDataCenters.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Add Data Center
  const handleAddDataCenter = () => {
    if (!newDC.id || !newDC.name || !newDC.client) return;
    setDataCenters([...dataCenters, newDC]);
    setNewDC({
      id: "",
      name: "",
      country: "",
      city: "",
      client: "",
      status: "Active",
    });
    setShowModal(false);
  };

  // Delete Data Center
  const handleDelete = (id) => {
    setDataCenters(dataCenters.filter((d) => d.id !== id));
  };

  // Toggle Status
  const handleToggleStatus = (id) => {
    setDataCenters(
      dataCenters.map((d) =>
        d.id === id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Data Centers</h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by Name, City, Client..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="h-10"
          />
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1); // Reset page on filter change
          }}>
            <SelectTrigger className="h-10 w-[200px] outline-none">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="primary" onClick={() => setShowModal(true)} className="h-10 w-full">
            + Add Data Center
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDataCenters.map((dc, idx) => (
              <tr
                key={dc.id}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium">{dc.id}</td>
                <td className="px-6 py-4">{dc.name}</td>
                <td className="px-6 py-4">{dc.country}</td>
                <td className="px-6 py-4">{dc.city}</td>
                <td className="px-6 py-4">{dc.client}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                      dc.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    onClick={() => handleToggleStatus(dc.id)}
                  >
                    {dc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(dc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedDataCenters.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No Data Centers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredDataCenters.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Add Data Center Modal */}
      {showModal && (
        <AddDataCenter
          open={showModal}
          setOpen={setShowModal}
          handleAddDataCenter={handleAddDataCenter}
          newDataCenter={newDC}
          setNewDataCenter={setNewDC}
        />
      )}
    </div>
  );
}
