import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddDataCenter({
  open,
  setOpen,
  newDataCenter,
  setNewDataCenter,
  handleAddDataCenter,
}) {
  if (!open) return null;

  // sample country/city lists (replace with dynamic API if needed)
  const countries = ["India", "USA", "UAE"];
  const cities = {
    India: ["Kochi", "Bangalore", "Delhi"],
    USA: ["New York", "San Francisco", "Chicago"],
    UAE: ["Dubai", "Abu Dhabi"],
  };

  // sample clients (replace with dynamic API if needed)
  const clients = ["ABC Corp", "XYZ Ltd", "TechWorld", "InnovaSoft", "NextGen"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        {/* header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold">Add Data Center</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add Data Center details including location, client, and status.
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <Select
              value={newDataCenter.client}
              onValueChange={(value) =>
                setNewDataCenter({ ...newDataCenter, client: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <Select
              value={newDataCenter.country}
              onValueChange={(value) =>
                setNewDataCenter({ ...newDataCenter, country: value, city: "" })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
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
              value={newDataCenter.city}
              onValueChange={(value) =>
                setNewDataCenter({ ...newDataCenter, city: value })
              }
              disabled={!newDataCenter.country}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {newDataCenter.country &&
                  cities[newDataCenter.country]?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
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
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddDataCenter}>Add Data Center</Button>
        </div>
      </div>
    </div>
  );
}
