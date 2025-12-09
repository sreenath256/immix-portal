import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { countries, cities } from "@/data/countries";

// TEMP DEMO DATA — REPLACE WITH BACKEND DATA
const dataCenters = [
  { name: "DC1", country: "India", city: "Mumbai" },
  { name: "DC2", country: "India", city: "Mumbai" },
  { name: "DC3", country: "India", city: "Delhi" },
  { name: "DC4", country: "China", city: "Beijing" },
  { name: "DC5", country: "US", city: "New York" },
  { name: "DC6", country: "France", city: "Paris" },
];

export default function AddClient({
  open,
  setOpen,
  newClient,
  setNewClient,
  handleSaveClient,
  isEditing,
}) {
  if (!open) return null;

  const [dcCountry, setDcCountry] = useState("");
  const [dcCity, setDcCity] = useState("");
  const [filteredDCs, setFilteredDCs] = useState([]);
  const [selectedDCs, setSelectedDCs] = useState([]);

  // -------------------- FILTER LOGIC --------------------
  useEffect(() => {
    if (!dcCountry || !dcCity) {
      setFilteredDCs([]);
      return;
    }

    let list = dataCenters.filter(
      (dc) =>
        dc.country === dcCountry &&
        dc.city === dcCity &&
        !selectedDCs.includes(dc.name)
    );

    setFilteredDCs(list);
  }, [dcCountry, dcCity, selectedDCs]);

  // -------------------- SELECT / UNSELECT DCs --------------------
  const toggleDC = (dc) => {
    let updated = [...selectedDCs];

    if (updated.includes(dc.name)) {
      updated = updated.filter((x) => x !== dc.name);
    } else {
      updated.push(dc.name);
    }

    setSelectedDCs(updated);

    const selectedObjects = dataCenters.filter((d) =>
      updated.includes(d.name)
    );
    const uniqueCountries = [
      ...new Set(selectedObjects.map((d) => d.country)),
    ];

    const newPricing = uniqueCountries.map((country) => {
      const existing = newClient.prices?.find((p) => p.country === country);
      return existing || { country, price: "" };
    });

    setNewClient({ ...newClient, prices: newPricing });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">
            {isEditing ? "Edit Client" : "Add Client"}
          </h3>

          <button
            onClick={() => setOpen(false)}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BASIC FIELDS (unchanged) ----------------------------------- */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Client Name
            </label>
            <Input
              placeholder="Enter client name..."
              value={newClient.name || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
            />
          </div>

          {/* Registered Country */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Registered Country
            </label>
            <Select
              value={newClient.country}
              onValueChange={(value) =>
                setNewClient({ ...newClient, country: value, city: "" })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem disabled>Select Country</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Registered City */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Registered City
            </label>
            <Select
              value={newClient.city}
              onValueChange={(value) =>
                setNewClient({ ...newClient, city: value })
              }
              disabled={!newClient.country}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {newClient.country &&
                  cities[newClient.country]?.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <Input
              placeholder="Enter full address..."
              value={newClient.address || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, address: e.target.value })
              }
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <Input
              type="number"
              value={newClient.pincode || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, pincode: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={newClient.email || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <PhoneInput
              country={"in"}
              value={newClient.phone || ""}
              onChange={(phone) =>
                setNewClient({ ...newClient, phone })
              }
              inputClass="!w-full !h-10 !text-sm !rounded-md"
              containerClass="!w-full"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              value={newClient.status}
              onValueChange={(value) =>
                setNewClient({ ...newClient, status: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          


          {/* ------------------ DATA CENTER SECTION ------------------ */}
          <div className="md:col-span-2 border-t my-4"></div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Select Data Centers
            </label>

            {/* Selected DCs Display */}
            {selectedDCs.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedDCs.map((dc) => (
                  <div
                    key={dc}
                    className="px-3 py-1 bg-blue-100 border rounded-full text-sm flex items-center gap-2"
                  >
                    {dc}
                    <button
                      className="text-red-500"
                      onClick={() =>
                        toggleDC(dataCenters.find((d) => d.name === dc))
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Filters */}
            <div className="flex gap-3 mb-3">
              {/* Country Filter */}
              <div className="w-1/3">
                <label className="text-sm">Country</label>
                <Select value={dcCountry} onValueChange={setDcCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem disabled>Select Country</SelectItem>
                    {[...new Set(dataCenters.map((dc) => dc.country))].map(
                      (c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div className="w-1/3">
                <label className="text-sm">City</label>
                <Select
                  value={dcCity}
                  onValueChange={setDcCity}
                  disabled={!dcCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(
                      dataCenters
                        .filter((dc) => dc.country === dcCountry)
                        .map((dc) => dc.city)
                    )].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* DC List */}
            {dcCountry && dcCity ? (
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2">
                {filteredDCs.length > 0 ? (
                  filteredDCs.map((dc) => (
                    <label
                      key={dc.name}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedDCs.includes(dc.name)}
                        onCheckedChange={() => toggleDC(dc)}
                      />
                      <span className="text-sm">
                        {dc.name} ({dc.city}, {dc.country})
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No data centers found.</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                Please select country and city.
              </p>
            )}
          </div>

          {/* ------------------ COUNTRY PRICING ------------------ */}
          <div className="md:col-span-2 border-t my-4"></div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Hourly Rates (USD)
            </label>

            {(!newClient.prices || newClient.prices.length === 0) && (
              <p className="text-sm text-gray-500">
                Select any data center to continue.
              </p>
            )}

            {newClient.prices?.map((p) => (
              <div key={p.country} className="flex items-center gap-3 mb-3">
                <div className="w-1/2 h-10 flex items-center px-3 border rounded-md bg-gray-50">
                  {p.country}
                </div>

                <Input
                  type="number"
                  className="w-1/3"
                  placeholder="Standard rate"
                  value={p.price}
                  min="0"
                  step="0.01"
                  onChange={(e) => {
                    const updated = newClient.prices.map((obj) =>
                      obj.country === p.country
                        ? { ...obj, price: e.target.value }
                        : obj
                    );
                    setNewClient({ ...newClient, prices: updated });
                  }}
                />

                <Input
                  type="number"
                  className="w-1/3"
                  placeholder="Off Standard rate"
                  value={p.offStandard}
                  min="0"
                  step="0.01"
                  onChange={(e) => {
                    const updated = newClient.offStandard.map((obj) =>
                      obj.country === p.country
                        ? { ...obj, offStandard: e.target.value }
                        : obj
                    );
                    setNewClient({ ...newClient, offStandard: updated });
                  }}
                />

                <Input
                  type="number"
                  className="w-1/3"
                  placeholder="Commute rate"
                  value={p.commute}
                  min="0"
                  step="0.01"
                  onChange={(e) => {
                    const updated = newClient.commute.map((obj) =>
                      obj.country === p.country
                        ? { ...obj, commute: e.target.value }
                        : obj
                    );
                    setNewClient({ ...newClient, commute: updated });
                  }}
                />

              </div>
            ))}
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveClient}>
            {isEditing ? "Save Changes" : "Add Client"}
          </Button>
        </div>
      </div>
    </div>
  );
}