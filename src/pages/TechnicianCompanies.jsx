import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import AddTechinicianCompany from "../components/ui/AddTechinicianCompany";

export default function TechnicianCompanies() {
  const [companies, setCompanies] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: `CO${1000 + i + 1}`,
      name: `Tech Serve Pvt Ltd ${i + 1}`,
      contactPerson: `Manager ${i + 1}`,
      phone: `98765${10000 + i}`,
      email: `company${i + 1}@example.com`,
      address: `Building ${i + 5}, Tech Park, City ${i + 1}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
    }))
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCompany, setNewCompany] = useState({
    id: "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  // Filter logic
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * companiesPerPage;
  const indexOfFirst = indexOfLast - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirst, indexOfLast);

  // Save company
  const handleSaveCompany = () => {
    if (!newCompany.name || !newCompany.phone || !newCompany.email) return;

    if (isEditing) {
      setCompanies(
        companies.map((c) => (c.id === newCompany.id ? newCompany : c))
      );
    } else {
      const newId = `CO${1000 + companies.length + 1}`;
      setCompanies([...companies, { ...newCompany, id: newId }]);
    }

    setNewCompany({
      id: "",
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
    });
    setIsEditing(false);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
    setDeleteId(null);
  };

  const handleToggleStatus = (id) =>
    setCompanies(
      companies.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );

  const openAddModal = () => {
    setNewCompany({
      id: "",
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (company) => {
    setNewCompany(company);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Field Technician Companies</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search by name, contact, email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10"
          />

          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-[150px] outline-none">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="primary"
            onClick={openAddModal}
            className="h-10 min-w-[150px]"
          >
            + Add Company
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Company Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((c, idx) => (
              <tr
                key={c.id}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium">{c.id}</td>
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4">{c.phone}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    onClick={() => handleToggleStatus(c.id)}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => openEditModal(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      setDeleteId(c.id);
                      setConfirmOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentCompanies.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No Companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredCompanies.length}
        itemsPerPage={companiesPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Modal */}
      {showModal && (
        <AddTechinicianCompany
          open={showModal}
          setOpen={setShowModal}
          newCompany={newCompany}
          setNewCompany={setNewCompany}
          handleAddCompany={handleSaveCompany}
          isEditing={isEditing}
        />
      )}

      {/* Confirm Delete */}
      {confirmOpen && (
        <ConfirmDialog
          open={confirmOpen}
          setOpen={setConfirmOpen}
          title="Delete Company"
          message="Are you sure you want to delete this company? This action cannot be undone."
          confirmText="Yes, Delete"
          cancelText="Cancel"
          onConfirm={() => handleDelete(deleteId)}
        />
      )}
    </div>
  );
}
