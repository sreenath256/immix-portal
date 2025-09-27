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

// Later you can create this component like AddDataCenter
// For now we just use a placeholder
import AddTechnician from "../components/ui/AddTechnician";
import Pagination from "@/components/ui/Pagination";

export default function FieldTechnicians() {
  const [technicians, setTechnicians] = useState([
    {
      id: "FT1001",
      name: "John Doe",
      email: "john.doe@example.com",
      dataCenters: ["NYC Data Center"],
      status: "Active",
    },
    {
      id: "FT1002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      dataCenters: ["SFO Data Center", "London Data Center", "Singapore Data Center", "Tokyo Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1003",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      dataCenters: ["Chicago Data Center", "NYC Data Center"],
      status: "Active",
    },
    {
      id: "FT1004",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      dataCenters: ["LA Data Center", "London Data Center", "Berlin Data Center"],
      status: "Active",
    },
    {
      id: "FT1005",
      name: "William Davis",
      email: "william.davis@example.com",
      dataCenters: ["Paris Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1006",
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      dataCenters: ["Tokyo Data Center", "Singapore Data Center"],
      status: "Active",
    },
    {
      id: "FT1007",
      name: "James Wilson",
      email: "james.wilson@example.com",
      dataCenters: ["NYC Data Center", "Chicago Data Center", "LA Data Center"],
      status: "Active",
    },
    {
      id: "FT1008",
      name: "Sophia Anderson",
      email: "sophia.anderson@example.com",
      dataCenters: ["London Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1009",
      name: "Benjamin Thomas",
      email: "benjamin.thomas@example.com",
      dataCenters: ["Singapore Data Center", "Tokyo Data Center"],
      status: "Active",
    },
    {
      id: "FT1010",
      name: "Isabella Jackson",
      email: "isabella.jackson@example.com",
      dataCenters: ["Berlin Data Center", "Paris Data Center"],
      status: "Active",
    },
    {
      id: "FT1011",
      name: "Alexander White",
      email: "alexander.white@example.com",
      dataCenters: ["NYC Data Center", "London Data Center", "Tokyo Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1012",
      name: "Mia Harris",
      email: "mia.harris@example.com",
      dataCenters: ["Chicago Data Center"],
      status: "Active",
    },
    {
      id: "FT1013",
      name: "Daniel Martin",
      email: "daniel.martin@example.com",
      dataCenters: ["SFO Data Center", "LA Data Center", "Paris Data Center"],
      status: "Active",
    },
    {
      id: "FT1014",
      name: "Charlotte Lee",
      email: "charlotte.lee@example.com",
      dataCenters: ["Singapore Data Center", "Berlin Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1015",
      name: "Henry Walker",
      email: "henry.walker@example.com",
      dataCenters: ["NYC Data Center", "Tokyo Data Center", "London Data Center"],
      status: "Active",
    },
    {
      id: "FT1016",
      name: "Amelia Hall",
      email: "amelia.hall@example.com",
      dataCenters: ["LA Data Center", "Chicago Data Center"],
      status: "Active",
    },
    {
      id: "FT1017",
      name: "Ethan Allen",
      email: "ethan.allen@example.com",
      dataCenters: ["Paris Data Center", "Berlin Data Center", "Tokyo Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1018",
      name: "Harper Young",
      email: "harper.young@example.com",
      dataCenters: ["SFO Data Center", "NYC Data Center"],
      status: "Active",
    },
    {
      id: "FT1019",
      name: "Lucas King",
      email: "lucas.king@example.com",
      dataCenters: ["London Data Center", "Singapore Data Center"],
      status: "Active",
    },
    {
      id: "FT1020",
      name: "Ella Wright",
      email: "ella.wright@example.com",
      dataCenters: ["Berlin Data Center", "LA Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1021",
      name: "Sebastian Scott",
      email: "sebastian.scott@example.com",
      dataCenters: ["Tokyo Data Center", "NYC Data Center", "Chicago Data Center"],
      status: "Active",
    },
    {
      id: "FT1022",
      name: "Avery Green",
      email: "avery.green@example.com",
      dataCenters: ["Paris Data Center"],
      status: "Active",
    },
    {
      id: "FT1023",
      name: "Jack Adams",
      email: "jack.adams@example.com",
      dataCenters: ["SFO Data Center", "London Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1024",
      name: "Scarlett Baker",
      email: "scarlett.baker@example.com",
      dataCenters: ["Singapore Data Center", "Tokyo Data Center"],
      status: "Active",
    },
    {
      id: "FT1025",
      name: "Matthew Nelson",
      email: "matthew.nelson@example.com",
      dataCenters: ["NYC Data Center", "Berlin Data Center"],
      status: "Active",
    },
    {
      id: "FT1026",
      name: "Victoria Carter",
      email: "victoria.carter@example.com",
      dataCenters: ["LA Data Center", "Paris Data Center", "SFO Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1027",
      name: "David Mitchell",
      email: "david.mitchell@example.com",
      dataCenters: ["Tokyo Data Center", "London Data Center"],
      status: "Active",
    },
    {
      id: "FT1028",
      name: "Grace Perez",
      email: "grace.perez@example.com",
      dataCenters: ["Singapore Data Center", "NYC Data Center"],
      status: "Active",
    },
    {
      id: "FT1029",
      name: "Joseph Roberts",
      email: "joseph.roberts@example.com",
      dataCenters: ["Chicago Data Center", "Berlin Data Center", "Paris Data Center"],
      status: "Inactive",
    },
    {
      id: "FT1030",
      name: "Lily Turner",
      email: "lily.turner@example.com",
      dataCenters: ["LA Data Center", "SFO Data Center", "London Data Center"],
      status: "Active",
    },
  ]);


  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newTech, setNewTech] = useState({
    id: "",
    name: "",
    email: "",
    dataCenters: [], // empty array
    status: "Active",
  });

  // Filter technicians
  const filteredTechnicians = technicians.filter((tech) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      tech.name.toLowerCase().includes(searchLower) ||
      tech.email.toLowerCase().includes(searchLower) ||
      tech.dataCenters.some((dc) =>
        dc.toLowerCase().includes(searchLower)
      ); // ✅ check inside array

    const matchesStatus =
      statusFilter === "All" || tech.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  // Add Technician
  const handleAddTechnician = () => {
    if (!newTech.id || !newTech.name || !newTech.email) return;
    setTechnicians([...technicians, newTech]);
    setNewTech({
      id: "",
      name: "",
      email: "",
      dataCenters: [],
      status: "Active",
    });
    setShowModal(false);
  };

  // Delete Technician
  const handleDelete = (id) => {
    setTechnicians(technicians.filter((t) => t.id !== id));
  };

  // Toggle Status
  const handleToggleStatus = (id) => {
    setTechnicians(
      technicians.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTechnicians = filteredTechnicians.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold capitalize">
          Field Technicians
        </h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-[200px] outline-none">
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
            onClick={() => setShowModal(true)}
            className="w-full h-10"
          >
            Add Technician
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
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Data Center</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTechnicians.map((tech, idx) => (
              <tr
                key={tech.id}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <td className="px-6 py-4 font-medium">{tech.id}</td>
                <td className="px-6 py-4">{tech.name}</td>
                <td className="px-6 py-4">{tech.email}</td>
                <td className="px-6 py-4">
                  {tech.dataCenters.length > 0 ? (
                    <>
                      {tech.dataCenters.slice(0, 2).map((dc, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-1"
                        >
                          {dc}
                        </span>
                      ))}
                      {tech.dataCenters.length > 2 && (
                        <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{tech.dataCenters.length - 2}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs">No Data Centers</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${tech.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                    onClick={() => handleToggleStatus(tech.id)}
                  >
                    {tech.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(tech.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentTechnicians.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No Technicians found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredTechnicians.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Add Technician Modal */}
      {showModal && (
        <AddTechnician
          open={showModal}
          setOpen={setShowModal}
          newTech={newTech}
          setNewTech={setNewTech}
          handleAddTechnician={handleAddTechnician}
        />
      )}
    </div>
  );
}
