import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, cities } from "@/data/countries";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddDataCenter({
  open,
  setOpen,
  newDataCenter,
  setNewDataCenter,
  handleAddDataCenter,
  isEditing = false,
}) {
  if (!open) return null;

  const allClients = {
    Kochi: ["ABC Corp", "TechWorld", "NextGen"],
    Bangalore: ["XYZ Ltd", "InnovaSoft", "GlobalTech"],
    Mumbai: ["Delta Systems", "InnovaSoft"],
    Dubai: ["GulfTech", "DataHub", "NetServe"],
    London: ["EuroNet", "CloudLink", "SkyComm"],
  };

  const [showCommute, setShowCommute] = useState(
    newDataCenter.locationType === "Out of City Limits"
  );
  const [selectedCountry, setSelectedCountry] = useState(
    newDataCenter.country || ""
  );
  const [selectedCity, setSelectedCity] = useState(newDataCenter.city || "");



  const handleLocationTypeChange = (value) => {
    setNewDataCenter({
      ...newDataCenter,
      locationType: value,
      commuteDuration:
        value === "Out of City Limits" ? newDataCenter.commuteDuration : "",
    });
    setShowCommute(value === "Out of City Limits");
  };
a


  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
    setNewDataCenter({ ...newDataCenter, country, city: "", clients: [] });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setNewDataCenter({ ...newDataCenter, city, clients: [] });
  };

  const removeClient = (client) => {
    setNewDataCenter({
      ...newDataCenter,
      clients: newDataCenter.clients.filter((c) => c !== client),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col">
        {/* header */}
        <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold">
              {isEditing ? "Edit Data Center" : "Add Data Center"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isEditing
                ? "Update Data Center details."
                : "Add Data Center details including location, client, and status."}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* scrollable body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {/* Data Center Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Center Name
            </label>
            <Input
              placeholder="Enter Data Center name..."
              value={newDataCenter.name}
              onChange={(e) =>
                setNewDataCenter({ ...newDataCenter, name: e.target.value })
              }
            />
          </div>

       

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <Select
              value={selectedCity}
              onValueChange={handleCityChange}
              disabled={!selectedCountry}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {selectedCountry &&
                  cities[selectedCountry]?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

         

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              placeholder="Enter address..."
              value={newDataCenter.address}
              onChange={(e) =>
                setNewDataCenter({ ...newDataCenter, address: e.target.value })
              }
            />
          </div>

          {/* Google Map Link */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Map Link
            </label>
            <Input
              placeholder="Paste Google Maps URL..."
              value={newDataCenter.googleMapLink || ""}
              onChange={(e) =>
                setNewDataCenter({ 
                  ...newDataCenter, 
                  googleMapLink: e.target.value 
                })
              }
            />
            <p className="mt-1 text-xs text-gray-500">
              Paste the Google Maps shareable link for this location
            </p>
          </div>

          {/* Location Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Type
            </label>
            <Select
              value={newDataCenter.locationType || ""}
              onValueChange={handleLocationTypeChange}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select Location Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Within City Limits">
                  Within City Limits
                </SelectItem>
                <SelectItem value="Out of City Limits">
                  Out of City Limits
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Commute Duration (Conditional) */}
          {showCommute && (
            <div className="flex gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commute Hours
                </label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-24"
                  value={newDataCenter.commuteHr || ""}
                  onChange={(e) =>
                    setNewDataCenter({
                      ...newDataCenter,
                      commuteHr: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commute Minutes
                </label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="0"
                  className="w-24"
                  value={newDataCenter.commuteMin || ""}
                  onChange={(e) =>
                    setNewDataCenter({
                      ...newDataCenter,
                      commuteMin: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Status */}
          <div className="md:col-span-2 mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select
              value={newDataCenter.status}
              onValueChange={(value) =>
                setNewDataCenter({ ...newDataCenter, status: value })
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
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t sticky bottom-0 bg-white z-10">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddDataCenter}>
            {isEditing ? "Update Data Center" : "Add Data Center"}
          </Button>
        </div>
      </div>
    </div>
  );
}