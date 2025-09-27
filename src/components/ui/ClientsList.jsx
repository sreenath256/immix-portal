import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

export default function ClientsList() {
  const [clients, setClients] = useState([
    {
      id: "CLT12875",
      name: "Tech Solutions Ltd.",
      city: "New York",
      dataCenters: 3,
      pricePerHour: "$120",
      totalHours: 240,
      totalAmount: "$28,800",
      status: "Active",
    },
    {
      id: "CLT76452",
      name: "Global IT Hub",
      city: "San Francisco",
      dataCenters: 5,
      pricePerHour: "$100",
      totalHours: 500,
      totalAmount: "$50,000",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    id: "",
    name: "",
    city: "",
    dataCenters: 0,
    pricePerHour: "$0",
    totalHours: 0,
    totalAmount: "$0",
    status: "Active",
  });

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.city.toLowerCase().includes(search.toLowerCase()) ||
      client.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Add client
  const handleAddClient = () => {
    if (!newClient.id || !newClient.name) return;
    setClients([...clients, newClient]);
    setNewClient({
      id: "",
      name: "",
      city: "",
      dataCenters: 0,
      pricePerHour: "$0",
      totalHours: 0,
      totalAmount: "$0",
      status: "Active",
    });
    setShowModal(false);
  };

  // Delete client
  const handleDelete = (id) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  // Toggle status
  const handleToggleStatus = (id) => {
    setClients(
      clients.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Clients</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search by ID, Name, City..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-3 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <Button onClick={() => setShowModal(true)}>+ Add Client</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Client ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Data Centers</th>
              <th className="px-6 py-3">Price/Hour</th>
              <th className="px-6 py-3">Total Hours</th>
              <th className="px-6 py-3">Total Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, idx) => (
              <tr
                key={client.id}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium">{client.id}</td>
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">{client.city}</td>
                <td className="px-6 py-4">{client.dataCenters}</td>
                <td className="px-6 py-4">{client.pricePerHour}</td>
                <td className="px-6 py-4">{client.totalHours}</td>
                <td className="px-6 py-4">{client.totalAmount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                      client.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    onClick={() => handleToggleStatus(client.id)}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(client.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <Modal title="Add Client" onClose={() => setShowModal(false)}>
          <Input
            placeholder="Client ID"
            value={newClient.id}
            onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
            className="mb-2 w-full"
          />
          <Input
            placeholder="Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            className="mb-2 w-full"
          />
          <Input
            placeholder="City"
            value={newClient.city}
            onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
            className="mb-2 w-full"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClient}>Save</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
