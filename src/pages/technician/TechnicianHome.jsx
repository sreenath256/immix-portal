import { useState } from "react";
import Input from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";

export default function TechnicianHome() {
  const navigate = useNavigate();

  // Example data centers the technician has access to
  const [dataCenters] = useState([
    { id: "DC001", name: "NYC Data Center", location: "New York" },
    { id: "DC002", name: "SFO Data Center", location: "San Francisco" },
    { id: "DC003", name: "LA Data Center", location: "Los Angeles" },
  ]);

  const [search, setSearch] = useState("");

  const filteredCenters = dataCenters.filter((dc) =>
    dc.name.toLowerCase().includes(search.toLowerCase()) ||
    dc.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">My Data Centers</h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search data center..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-[250px]"
          />
        </div>
      </div>

      {/* Data Center Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCenters.map((dc) => (
          <div
            key={dc.id}
            onClick={() => navigate(`/technician/data-center/${dc.id}`)}
            className="cursor-pointer rounded-lg bg-white shadow transition border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800">{dc.name}</h3>
            <p className="text-gray-500">{dc.location}</p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
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
    </div>
  );
}
