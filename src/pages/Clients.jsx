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

export default function ClientsList() {
    const [clients, setClients] = useState(
        [
            {
                id: "CLT12875",
                name: "Client A",
                country: "USA",
                city: "New York",
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
                dataCenters: 2,
                pricePerHour: "$95",
                totalHours: 150,
                totalAmount: "$14,250",
                status: "Active",
            },
            {
                id: "CLT76452",
                name: "Client C",
                country: "USA",
                city: "San Francisco",
                dataCenters: 5,
                pricePerHour: "$100",
                totalHours: 500,
                totalAmount: "$50,000",
                status: "Inactive",
            },
            {
                id: "CLT10004",
                name: "Client D",
                country: "USA",
                city: "Dallas",
                dataCenters: 1,
                pricePerHour: "$110",
                totalHours: 200,
                totalAmount: "$22,000",
                status: "Active",
            },
            {
                id: "CLT10005",
                name: "Client E",
                country: "USA",
                city: "Boston",
                dataCenters: 4,
                pricePerHour: "$130",
                totalHours: 300,
                totalAmount: "$39,000",
                status: "Active",
            },
            {
                id: "CLT10006",
                name: "Client F",
                country: "USA",
                city: "Miami",
                dataCenters: 2,
                pricePerHour: "$90",
                totalHours: 180,
                totalAmount: "$16,200",
                status: "Inactive",
            },
            {
                id: "CLT10007",
                name: "Client G",
                country: "USA",
                city: "Seattle",
                dataCenters: 3,
                pricePerHour: "$125",
                totalHours: 210,
                totalAmount: "$26,250",
                status: "Active",
            },
            {
                id: "CLT10008",
                name: "Client H",
                country: "USA",
                city: "Austin",
                dataCenters: 2,
                pricePerHour: "$100",
                totalHours: 220,
                totalAmount: "$22,000",
                status: "Active",
            },
            {
                id: "CLT10009",
                name: "Client I",
                country: "USA",
                city: "Denver",
                dataCenters: 1,
                pricePerHour: "$85",
                totalHours: 130,
                totalAmount: "$11,050",
                status: "Inactive",
            },
            {
                id: "CLT10010",
                name: "Client J",
                country: "USA",
                city: "Atlanta",
                dataCenters: 3,
                pricePerHour: "$115",
                totalHours: 190,
                totalAmount: "$21,850",
                status: "Active",
            },
            {
                id: "CLT10011",
                name: "Client K",
                country: "USA",
                city: "Portland",
                dataCenters: 2,
                pricePerHour: "$105",
                totalHours: 160,
                totalAmount: "$16,800",
                status: "Active",
            },
            {
                id: "CLT10012",
                name: "Client L",
                country: "USA",
                city: "Houston",
                dataCenters: 4,
                pricePerHour: "$125",
                totalHours: 250,
                totalAmount: "$31,250",
                status: "Inactive",
            },
            {
                id: "CLT10013",
                name: "Client M",
                country: "USA",
                city: "San Diego",
                dataCenters: 3,
                pricePerHour: "$95",
                totalHours: 175,
                totalAmount: "$16,625",
                status: "Active",
            },
            {
                id: "CLT10014",
                name: "Client N",
                country: "USA",
                city: "Las Vegas",
                dataCenters: 2,
                pricePerHour: "$100",
                totalHours: 140,
                totalAmount: "$14,000",
                status: "Active",
            },
            {
                id: "CLT10015",
                name: "Client O",
                country: "USA",
                city: "Orlando",
                dataCenters: 1,
                pricePerHour: "$110",
                totalHours: 120,
                totalAmount: "$13,200",
                status: "Inactive",
            },
            {
                id: "CLT10016",
                name: "Client P",
                country: "USA",
                city: "Phoenix",
                dataCenters: 2,
                pricePerHour: "$125",
                totalHours: 210,
                totalAmount: "$26,250",
                status: "Active",
            },
            {
                id: "CLT10017",
                name: "Client Q",
                country: "USA",
                city: "Philadelphia",
                dataCenters: 3,
                pricePerHour: "$90",
                totalHours: 230,
                totalAmount: "$20,700",
                status: "Active",
            },
            {
                id: "CLT10018",
                name: "Client R",
                country: "USA",
                city: "Detroit",
                dataCenters: 2,
                pricePerHour: "$100",
                totalHours: 160,
                totalAmount: "$16,000",
                status: "Inactive",
            },
            {
                id: "CLT10019",
                name: "Client S",
                country: "USA",
                city: "Columbus",
                dataCenters: 1,
                pricePerHour: "$115",
                totalHours: 180,
                totalAmount: "$20,700",
                status: "Active",
            },
            {
                id: "CLT10020",
                name: "Client T",
                country: "USA",
                city: "Charlotte",
                dataCenters: 2,
                pricePerHour: "$120",
                totalHours: 200,
                totalAmount: "$24,000",
                status: "Active",
            },
            {
                id: "CLT10021",
                name: "Client U",
                country: "USA",
                city: "Indianapolis",
                dataCenters: 3,
                pricePerHour: "$100",
                totalHours: 210,
                totalAmount: "$21,000",
                status: "Inactive",
            },
            {
                id: "CLT10022",
                name: "Client V",
                country: "USA",
                city: "Kansas City",
                dataCenters: 2,
                pricePerHour: "$105",
                totalHours: 170,
                totalAmount: "$17,850",
                status: "Active",
            },
            {
                id: "CLT10023",
                name: "Client W",
                country: "USA",
                city: "Minneapolis",
                dataCenters: 3,
                pricePerHour: "$125",
                totalHours: 260,
                totalAmount: "$32,500",
                status: "Active",
            },
            {
                id: "CLT10024",
                name: "Client X",
                country: "USA",
                city: "Cleveland",
                dataCenters: 1,
                pricePerHour: "$90",
                totalHours: 150,
                totalAmount: "$13,500",
                status: "Inactive",
            },
            {
                id: "CLT10025",
                name: "Client Y",
                country: "USA",
                city: "Salt Lake City",
                dataCenters: 2,
                pricePerHour: "$95",
                totalHours: 190,
                totalAmount: "$18,050",
                status: "Active",
            },
            {
                id: "CLT10026",
                name: "Client Z",
                country: "USA",
                city: "Milwaukee",
                dataCenters: 1,
                pricePerHour: "$100",
                totalHours: 130,
                totalAmount: "$13,000",
                status: "Active",
            },
        ].sort((a, b) => a.name.localeCompare(b.name)) // Sorted A → Z
    );


    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
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
    const [showModal, setShowModal] = useState(false);

    // Filter clients by search & status


    // Add client
    const handleAddClient = () => {
        if (!newClient.name || !newClient.country || !newClient.city) {
            alert("Please fill in all required fields.");
            return;
        }

        // Auto-generate an ID
        const newId = Date.now().toString();

        setClients([...clients, { ...newClient, id: newId }]);

        // Reset form
        setNewClient({
            id: "",
            name: "",
            country: "",
            city: "",
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

    const filteredClients = clients.filter((client) => {
        const searchLower = search.toLowerCase();

        const matchesSearch =
            client.name.toLowerCase().includes(searchLower) ||
            client.email.toLowerCase().includes(searchLower) ||
            client.dataCenters.some((dc) =>
                dc.toLowerCase().includes(searchLower)
            ); // ✅ check inside array

        const matchesStatus =
            statusFilter === "All" || tech.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClients = filteredClients.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
                <h2 className="text-2xl font-semibold">Clients</h2>
                <div className="flex gap-2 items-center ">
                    <Input
                        placeholder="Search by ID, Name, City..."
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
                    <Button variant="primary" onClick={() => setShowModal(true)} className="h-10 flex items-center w-full text-center justify-center">
                        + Add Client
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Client ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Country</th>
                            <th className="px-6 py-3">City</th>
                            <th className="px-6 py-3">Data Centers</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClients.map((client, idx) => (
                            <tr
                                key={client.id}
                                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                            >
                                <td className="px-6 py-4 font-medium">{client.id}</td>
                                <td className="px-6 py-4">{client.name}</td>
                                <td className="px-6 py-4">{client.country}</td>
                                <td className="px-6 py-4">{client.city}</td>
                                <td className="px-6 py-4">{client.dataCenters}</td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${client.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                        onClick={() => handleToggleStatus(client.id)}
                                    >
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" onClick={() => alert("Edit clicked")}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="ml-2"
                                        onClick={() => handleDelete(client.id)}
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
            {/* ✅ Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalItems={filteredClients.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />

            {/* Add Client Modal */}
            {showModal && (
                <AddClient
                    open={showModal}
                    setOpen={setShowModal}
                    newClient={newClient}
                    setNewClient={setNewClient}
                    handleAddClient={handleAddClient}
                />
            )}
        </div>
    );
}
