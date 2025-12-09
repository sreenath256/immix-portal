import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import WorkFormModal from "./WorkFormModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, cities } from "@/data/countries"; // ✅ correct import

export default function TechnicianHome() {
  const navigate = useNavigate();

  const [dataCenters, setDataCenters] = useState([
    {
      id: "DC001",
      name: "NYC Data Center",
      location: "New York",
      country: "United States",
      city: "New York",
    },
    {
      id: "DC002",
      name: "SFO Data Center",
      location: "San Francisco",
      country: "United States",
      city: "San Francisco",
    },
    {
      id: "DC003",
      name: "Delhi Data Center",
      location: "Delhi",
      country: "India",
      city: "Delhi",
    },
  ]);

  const [search, setSearch] = useState("");
  const [formModal, setFormModal] = useState({ open: false, data: null });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);

  // ✅ update cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      setAvailableCities(cities[selectedCountry] || []);
      setSelectedCity("");
    } else {
      setAvailableCities([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  // ✅ save handler
  const handleSaveCenter = (form, mode) => {
    if (!form.name || !form.location) return;

    if (mode === "add") {
      const newEntry = {
        id: `DC${String(dataCenters.length + 1).padStart(3, "0")}`,
        name: form.name,
        location: form.location,
        country: form.country || selectedCountry || "Unknown",
        city: form.city || selectedCity || "Unknown",
      };
      setDataCenters([...dataCenters, newEntry]);
    } else if (mode === "edit" && form.id) {
      setDataCenters(
        dataCenters.map((dc) => (dc.id === form.id ? { ...dc, ...form } : dc))
      );
    }

    setFormModal({ open: false, data: null });
  };

  // ✅ filter results
  const filteredCenters = dataCenters.filter((dc) => {
    const matchesSearch =
      dc.name.toLowerCase().includes(search.toLowerCase()) ||
      dc.location.toLowerCase().includes(search.toLowerCase());

    const matchesCountry = selectedCountry ? dc.country === selectedCountry : true;
    const matchesCity = selectedCity ? dc.city === selectedCity : true;

    return matchesSearch && matchesCountry && matchesCity;
  });

  return (
    <div className="p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">My Data Centers</h2>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search data center..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-[220px]"
          />

          {/* Country Filter */}
          <Select
            value={selectedCountry}
            onValueChange={(value) => setSelectedCountry(value)}
          >
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto"> {/* ✅ scrollable */}
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* City Filter */}
          <Select
            value={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            disabled={!selectedCountry}
          >
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent className="max-h-56 overflow-y-auto"> {/* ✅ scrollable */}
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => setFormModal({ open: true, data: null })}
            className="w-[150px]"
          >
            Add Work
          </Button>
        </div>
      </div>

      {/* Data Center Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[75vh] overflow-y-auto pr-2"> {/* ✅ scrollable */}
        {filteredCenters.map((dc) => (
          <div
            key={dc.id}
            className="cursor-pointer rounded-lg bg-white shadow transition border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800">{dc.name}</h3>
            <p className="text-gray-500">{dc.location}</p>
            <p className="text-sm text-gray-400 mt-1">
              {dc.city}, {dc.country}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                onClick={() => navigate(`/technician/data-center/${dc.id}`)}
              >
                View Work Reports
              </button>
            </div>
          </div>
        ))}

        {filteredCenters.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500 bg-white rounded-lg shadow">
            No Data Centers Found
          </div>
        )}
      </div>

      {/* Add/Edit Data Center Modal */}
      {formModal.open && (
        <WorkFormModal
          open={formModal.open}
          data={formModal.data}
          onClose={() => setFormModal({ open: false, data: null })}
          onSave={handleSaveCenter}
        />
      )}
    </div>
  );
}
