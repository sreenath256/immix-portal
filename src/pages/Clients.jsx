import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddClient from "@/components/ui/AddClient";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ViewClient from "@/components/ui/ViewClient";

export default function ClientsList() {
  const [clients, setClients] = useState([
    {
      id: "CLT12875",
      name: "Client A",
      country: "USA",
      city: "New York",
      address: "123 Main St, Manhattan",
      pincode: "10001",
      email: "clienta@example.com",
      phone: "+1 212-555-1234",
      dataCenters: 3,
      pricePerHour: "$120",
      totalHours: 240,
      totalAmount: "$28,800",
      status: "Active",
    },
    {
      id: "CLT98231",
      name: "Client B",
      country: "USA",
      city: "Chicago",
      address: "456 State St, Chicago",
      pincode: "60601",
      email: "clientb@example.com",
      phone: "+1 312-555-5678",
      dataCenters: 2,
      pricePerHour: "$95",
      totalHours: 150,
      totalAmount: "$14,250",
      status: "Active",
    },
    {
      id: "CLT45322",
      name: "Client C",
      country: "India",
      city: "Bangalore",
      address: "MG Road, Bangalore, Karnataka",
      pincode: "560001",
      email: "clientc@example.in",
      phone: "+91 98470 11223",
      dataCenters: 4,
      pricePerHour: "$60",
      totalHours: 400,
      totalAmount: "$24,000",
      status: "Inactive",
    },
    {
      id: "CLT77410",
      name: "Client D",
      country: "UAE",
      city: "Dubai",
      address: "Business Bay, Dubai",
      pincode: "00000",
      email: "clientd@uae.com",
      phone: "+971 50 234 5678",
      dataCenters: 5,
      pricePerHour: "$110",
      totalHours: 180,
      totalAmount: "$19,800",
      status: "Active",
    },
    {
      id: "CLT55201",
      name: "Client E",
      country: "UK",
      city: "London",
      address: "45 Oxford Street, London",
      pincode: "W1D 2DZ",
      email: "cliente@company.co.uk",
      phone: "+44 7900 123456",
      dataCenters: 3,
      pricePerHour: "$130",
      totalHours: 200,
      totalAmount: "$26,000",
      status: "Inactive",
    },
    {
      id: "CLT88212",
      name: "Client F",
      country: "Germany",
      city: "Berlin",
      address: "Alexanderplatz, Berlin",
      pincode: "10178",
      email: "clientf@berlin.de",
      phone: "+49 30 1234567",
      dataCenters: 2,
      pricePerHour: "$105",
      totalHours: 210,
      totalAmount: "$22,050",
      status: "Active",
    },
    {
      id: "CLT12001",
      name: "Client G",
      country: "Canada",
      city: "Toronto",
      address: "Bay Street, Toronto, ON",
      pincode: "M5J 2N8",
      email: "clientg@canada.ca",
      phone: "+1 416-555-9876",
      dataCenters: 1,
      pricePerHour: "$90",
      totalHours: 160,
      totalAmount: "$14,400",
      status: "Active",
    },
    {
      id: "CLT67345",
      name: "Client H",
      country: "France",
      city: "Paris",
      address: "Rue de Rivoli, Paris",
      pincode: "75001",
      email: "clienth@paris.fr",
      phone: "+33 612 345 678",
      dataCenters: 3,
      pricePerHour: "$100",
      totalHours: 175,
      totalAmount: "$17,500",
      status: "Inactive",
    },
    {
      id: "CLT44902",
      name: "Client I",
      country: "Singapore",
      city: "Singapore",
      address: "Orchard Road, Central Area",
      pincode: "238826",
      email: "clienti@singapore.sg",
      phone: "+65 8123 4567",
      dataCenters: 2,
      pricePerHour: "$115",
      totalHours: 190,
      totalAmount: "$21,850",
      status: "Active",
    },
    {
      id: "CLT33299",
      name: "Client J",
      country: "Australia",
      city: "Sydney",
      address: "George Street, Sydney",
      pincode: "2000",
      email: "clientj@australia.com",
      phone: "+61 412 345 678",
      dataCenters: 4,
      pricePerHour: "$125",
      totalHours: 220,
      totalAmount: "$27,500",
      status: "Active",
    },
  ]);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentClient, setCurrentClient] = useState({
    id: "",
    name: "",
    country: "",
    city: "",
    address: "",
    pincode: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const handleSaveClient = () => {
    if (!currentClient.name || !currentClient.country || !currentClient.city) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      setClients(
        clients.map((c) =>
          c.id === currentClient.id ? { ...currentClient } : c
        )
      );
    } else {
      const newId = "CLT" + Date.now().toString().slice(-5);
      setClients([...clients, { ...currentClient, id: newId }]);
    }

    setModalOpen(false);
    setIsEditing(false);
    setCurrentClient({
      id: "",
      name: "",
      country: "",
      city: "",
      address: "",
      pincode: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  const handleDelete = (id) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  const handleToggleStatus = (id) => {
    setClients(
      clients.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
  };

  const filteredClients = clients.filter((client) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      client.name.toLowerCase().includes(searchLower) ||
      client.city.toLowerCase().includes(searchLower) ||
      client.country.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "All" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Clients</h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-[200px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setIsEditing(false);
              setCurrentClient({
                id: "",
                name: "",
                country: "",
                city: "",
                address: "",
                pincode: "",
                email: "",
                phone: "",
                status: "Active",
              });
              setModalOpen(true);
            }}
            className="h-10 flex items-center w-full"
          >
            + Add Client
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Client ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Registered City</th>
              <th className="px-6 py-3">Registered Country</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client, idx) => (
              <tr
                key={client.id}
                className={`border-b ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">{client.id}</td>
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">{client.city}</td>
                <td className="px-6 py-4">{client.country}</td>
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
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedClient(client);
                      setViewOpen(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentClient(client);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setClientToDelete(client);
                      setDeleteDialogOpen(true);
                    }}
                  >
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

      <ConfirmDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Delete Client"
        message={`Are you sure you want to delete "${clientToDelete?.name || ""}"?`}
        onConfirm={() => clientToDelete && handleDelete(clientToDelete.id)}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredClients.length}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
      />

      {modalOpen && (
        <AddClient
          open={modalOpen}
          setOpen={setModalOpen}
          newClient={currentClient}
          setNewClient={setCurrentClient}
          handleSaveClient={handleSaveClient}
          isEditing={isEditing}
        />
      )}
      <ViewClient open={viewOpen} setOpen={setViewOpen} client={selectedClient} />
    </div>
  );
}
