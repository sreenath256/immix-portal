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
import AddCity from "../components/ui/AddCity";
import Pagination from "../components/ui/Pagination";
import { useLocation } from "react-router-dom";

export default function CitiesList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const countryQuery = queryParams.get("country"); // initial country from URL

  const allCountries = ["USA", "India", "UK", "Canada"];

  // States
  const [cities, setCities] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: `CT${1000 + i + 1}`,
      name: `City ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
      country: allCountries[i % allCountries.length],
      status: i % 2 === 0 ? "Active" : "Inactive",
    }))
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState(countryQuery || "All");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCity, setNewCity] = useState({
    id: "",
    name: "",
    country: "",
    status: "Active",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 10;

  // Filter cities based on search, status, and country
  const filteredCities = cities.filter((ct) => {
    const matchesSearch =
      ct.name.toLowerCase().includes(search.toLowerCase()) ||
      ct.country.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || ct.status === statusFilter;

    const matchesCountry =
      countryFilter === "All" || ct.country === countryFilter;

    return matchesSearch && matchesStatus && matchesCountry;
  });

  const indexOfLast = currentPage * citiesPerPage;
  const indexOfFirst = indexOfLast - citiesPerPage;
  const currentCities = filteredCities.slice(indexOfFirst, indexOfLast);

  // Add or Update City
  const handleSaveCity = () => {
    if (!newCity.name || !newCity.country) return;

    if (isEditing) {
      setCities(cities.map((c) => (c.id === newCity.id ? newCity : c)));
    } else {
      const newId = `CT${1000 + cities.length + 1}`;
      setCities([...cities, { ...newCity, id: newId }]);
    }

    setNewCity({ id: "", name: "", country: "", status: "Active" });
    setIsEditing(false);
    setShowModal(false);
  };

  const handleDelete = (id) => setCities(cities.filter((c) => c.id !== id));

  const handleToggleStatus = (id) =>
    setCities(
      cities.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );

  const openAddModal = () => {
    setNewCity({ id: "", name: "", country: "", status: "Active" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (city) => {
    setNewCity(city);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Cities</h2>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <Input
            placeholder="Search by City or Country..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10"
          />

          {/* Country Filter */}
          <Select
            value={countryFilter}
            onValueChange={(val) => {
              setCountryFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-[200px] outline-none">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Countries</SelectItem>
              {allCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
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
            + Add City
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCities.map((ct, idx) => (
              <tr
                key={ct.id}
                className={`border-b ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">{ct.id}</td>
                <td className="px-6 py-4">{ct.name}</td>
                <td className="px-6 py-4">{ct.country}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                      ct.status === "Active"
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
            {currentCities.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500"
                >
                  No Cities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredCities.length}
        itemsPerPage={citiesPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Modal */}
      {showModal && (
        <AddCity
          open={showModal}
          setOpen={setShowModal}
          newCity={newCity}
          setNewCity={setNewCity}
          handleAddCity={handleSaveCity}
          countries={allCountries}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}
