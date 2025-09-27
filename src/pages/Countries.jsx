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
import AddCountry from "../components/ui/AddCountry"; // popup component
import Pagination from "../components/ui/Pagination"; // pagination component
import { useNavigate } from "react-router-dom";


export default function CountriesList() {
  // Sample 20 countries
  const initialCountries = [
    { id: "CO1001", name: "USA", status: "Active" },
    { id: "CO1002", name: "India", status: "Active" },
    { id: "CO1003", name: "UK", status: "Inactive" },
    { id: "CO1004", name: "Canada", status: "Active" },
    { id: "CO1005", name: "Germany", status: "Inactive" },
    { id: "CO1006", name: "France", status: "Active" },
    { id: "CO1007", name: "Australia", status: "Active" },
    { id: "CO1008", name: "Japan", status: "Inactive" },
    { id: "CO1009", name: "China", status: "Active" },
    { id: "CO1010", name: "Brazil", status: "Active" },
    { id: "CO1011", name: "Mexico", status: "Inactive" },
    { id: "CO1012", name: "South Korea", status: "Active" },
    { id: "CO1013", name: "Italy", status: "Active" },
    { id: "CO1014", name: "Spain", status: "Inactive" },
    { id: "CO1015", name: "Netherlands", status: "Active" },
    { id: "CO1016", name: "Sweden", status: "Active" },
    { id: "CO1017", name: "Norway", status: "Inactive" },
    { id: "CO1018", name: "Switzerland", status: "Active" },
    { id: "CO1019", name: "Russia", status: "Active" },
    { id: "CO1020", name: "Egypt", status: "Inactive" },
  ];

  const [countries, setCountries] = useState(initialCountries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();


  const [newCountry, setNewCountry] = useState({
    id: "",
    name: "",
    status: "Active",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered countries
  const filteredCountries = countries.filter((ct) => {
    const matchesSearch = ct.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || ct.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);

  // Add or Update Country
  const handleSaveCountry = () => {
    if (!newCountry.name) return;

    if (isEditing) {
      setCountries(countries.map((c) => (c.id === newCountry.id ? newCountry : c)));
    } else {
      const newId = `CO${1000 + countries.length + 1}`;
      setCountries([...countries, { ...newCountry, id: newId }]);
    }

    setNewCountry({ id: "", name: "", status: "Active" });
    setIsEditing(false);
    setShowModal(false);
  };

  // Delete Country
  const handleDelete = (id) => setCountries(countries.filter((c) => c.id !== id));

  // Toggle Status
  const handleToggleStatus = (id) =>
    setCountries(
      countries.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
      )
    );

  // Open Add Modal
  const openAddModal = () => {
    setNewCountry({ id: "", name: "", status: "Active" });
    setIsEditing(false);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (country) => {
    setNewCountry(country);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Countries</h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by country..."
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
            <SelectTrigger className="h-10 w-[200px] outline-none">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="primary" onClick={openAddModal} className="h-10 w-full">
            + Add Country
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((ct, idx) => (
              <tr
                key={ct.id}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium">{ct.id}</td>
                <td
                  className="px-6 py-4 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/cities?country=${ct.name}`)}
                >
                  {ct.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${ct.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                    onClick={() => handleToggleStatus(ct.id)}
                  >
                    {ct.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => openEditModal(ct)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(ct.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentCountries.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No Countries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredCountries.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Modal */}
      {showModal && (
        <AddCountry
          open={showModal}
          setOpen={setShowModal}
          newCountry={newCountry}
          setNewCountry={setNewCountry}
          handleAddCountry={handleSaveCountry}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}
