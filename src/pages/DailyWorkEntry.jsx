import { useState } from "react";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BillViewer from "@/components/ui/BillViewer";
import Pagination from "@/components/ui/Pagination"; // import your pagination component

export default function DailyWorkReports() {
const [reports] = useState([
    {
        id: "WRK001",
        date: "2025-09-24",
        technician: "John Doe",
        dataCenter: "NYC Data Center",
        client: "Tech Solutions Ltd.",
        hours: 8,
        workers: 3,
        expenses: 120,
        bills: [
            "https://via.placeholder.com/200x120.png?text=Bill+1",
            "https://via.placeholder.com/200x120.png?text=Bill+2",
        ],
        status: "Submitted",
    },
    {
        id: "WRK002",
        date: "2025-09-23",
        technician: "Jane Smith",
        dataCenter: "SFO Data Center",
        client: "Global IT Hub",
        hours: 6,
        workers: 2,
        expenses: 80,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+3"],
        status: "Approved",
    },
    {
        id: "WRK003",
        date: "2025-09-22",
        technician: "Alice Johnson",
        dataCenter: "LA Data Center",
        client: "Innovatech",
        hours: 7,
        workers: 4,
        expenses: 150,
        bills: [],
        status: "Rejected",
    },
    {
        id: "WRK004",
        date: "2025-09-21",
        technician: "Bob Lee",
        dataCenter: "NYC Data Center",
        client: "DataCorp",
        hours: 5,
        workers: 2,
        expenses: 60,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+4"],
        status: "Submitted",
    },
    {
        id: "WRK005",
        date: "2025-09-20",
        technician: "Carol White",
        dataCenter: "SFO Data Center",
        client: "Tech Solutions Ltd.",
        hours: 9,
        workers: 5,
        expenses: 200,
        bills: [
            "https://via.placeholder.com/200x120.png?text=Bill+5",
            "https://via.placeholder.com/200x120.png?text=Bill+6",
        ],
        status: "Approved",
    },
    {
        id: "WRK006",
        date: "2025-09-19",
        technician: "David Kim",
        dataCenter: "LA Data Center",
        client: "Global IT Hub",
        hours: 4,
        workers: 1,
        expenses: 40,
        bills: [],
        status: "Submitted",
    },
    {
        id: "WRK007",
        date: "2025-09-18",
        technician: "Eva Green",
        dataCenter: "NYC Data Center",
        client: "Innovatech",
        hours: 8,
        workers: 3,
        expenses: 110,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+7"],
        status: "Approved",
    },
    {
        id: "WRK008",
        date: "2025-09-17",
        technician: "Frank Black",
        dataCenter: "SFO Data Center",
        client: "DataCorp",
        hours: 6,
        workers: 2,
        expenses: 75,
        bills: [],
        status: "Rejected",
    },
    {
        id: "WRK009",
        date: "2025-09-16",
        technician: "Grace Lee",
        dataCenter: "LA Data Center",
        client: "Tech Solutions Ltd.",
        hours: 7,
        workers: 4,
        expenses: 130,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+8"],
        status: "Submitted",
    },
    {
        id: "WRK010",
        date: "2025-09-15",
        technician: "Henry Ford",
        dataCenter: "NYC Data Center",
        client: "Global IT Hub",
        hours: 5,
        workers: 2,
        expenses: 55,
        bills: [],
        status: "Approved",
    },
    {
        id: "WRK011",
        date: "2025-09-14",
        technician: "Ivy Brown",
        dataCenter: "SFO Data Center",
        client: "Innovatech",
        hours: 9,
        workers: 5,
        expenses: 210,
        bills: [
            "https://via.placeholder.com/200x120.png?text=Bill+9",
            "https://via.placeholder.com/200x120.png?text=Bill+10",
        ],
        status: "Submitted",
    },
    {
        id: "WRK012",
        date: "2025-09-13",
        technician: "Jack White",
        dataCenter: "LA Data Center",
        client: "DataCorp",
        hours: 4,
        workers: 1,
        expenses: 35,
        bills: [],
        status: "Rejected",
    },
    {
        id: "WRK013",
        date: "2025-09-12",
        technician: "Karen Black",
        dataCenter: "NYC Data Center",
        client: "Tech Solutions Ltd.",
        hours: 8,
        workers: 3,
        expenses: 125,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+11"],
        status: "Approved",
    },
    {
        id: "WRK014",
        date: "2025-09-11",
        technician: "Leo Green",
        dataCenter: "SFO Data Center",
        client: "Global IT Hub",
        hours: 6,
        workers: 2,
        expenses: 70,
        bills: [],
        status: "Submitted",
    },
    {
        id: "WRK015",
        date: "2025-09-10",
        technician: "Mona Blue",
        dataCenter: "LA Data Center",
        client: "Innovatech",
        hours: 7,
        workers: 4,
        expenses: 140,
        bills: [
            "https://via.placeholder.com/200x120.png?text=Bill+12",
            "https://via.placeholder.com/200x120.png?text=Bill+13",
        ],
        status: "Approved",
    },
    {
        id: "WRK016",
        date: "2025-09-09",
        technician: "Nina Red",
        dataCenter: "NYC Data Center",
        client: "DataCorp",
        hours: 5,
        workers: 2,
        expenses: 65,
        bills: [],
        status: "Rejected",
    },
    {
        id: "WRK017",
        date: "2025-09-08",
        technician: "Oscar Pink",
        dataCenter: "SFO Data Center",
        client: "Tech Solutions Ltd.",
        hours: 9,
        workers: 5,
        expenses: 220,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+14"],
        status: "Submitted",
    },
    {
        id: "WRK018",
        date: "2025-09-07",
        technician: "Paul Gray",
        dataCenter: "LA Data Center",
        client: "Global IT Hub",
        hours: 4,
        workers: 1,
        expenses: 45,
        bills: [],
        status: "Approved",
    },
    {
        id: "WRK019",
        date: "2025-09-06",
        technician: "Quinn Violet",
        dataCenter: "NYC Data Center",
        client: "Innovatech",
        hours: 8,
        workers: 3,
        expenses: 135,
        bills: [
            "https://via.placeholder.com/200x120.png?text=Bill+15",
            "https://via.placeholder.com/200x120.png?text=Bill+16",
        ],
        status: "Submitted",
    },
    {
        id: "WRK020",
        date: "2025-09-05",
        technician: "Rita Orange",
        dataCenter: "SFO Data Center",
        client: "DataCorp",
        hours: 6,
        workers: 2,
        expenses: 85,
        bills: [],
        status: "Rejected",
    },
    {
        id: "WRK021",
        date: "2025-09-04",
        technician: "Sam green",
        dataCenter: "LA Data Center",
        client: "Tech Solutions Ltd.",
        hours: 7,
        workers: 4,
        expenses: 145,
        bills: ["https://via.placeholder.com/200x120.png?text=Bill+17"],
        status: "Approved",
    },
    {
        id: "WRK022",
        date: "2025-09-03",
        technician: "Tina Silver",
        dataCenter: "NYC Data Center",
        client: "Global IT Hub",
        hours: 5,
        workers: 2,
        expenses: 75,
        bills: [],
        status: "Submitted",
    }
]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedBills, setSelectedBills] = useState([]);
  const [isBillViewerOpen, setIsBillViewerOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter reports
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.technician.toLowerCase().includes(search.toLowerCase()) ||
      r.dataCenter.toLowerCase().includes(search.toLowerCase()) ||
      r.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    const matchesDate = !dateFilter || r.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Paginate filtered reports
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold whitespace-nowrap">Daily Work Reports</h2>
          <div className="flex flex-wrap md:flex-nowrap gap-2 items-center w-full md:w-auto">
            <Input
              placeholder="Search by Technician, Data Center, Client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 flex-1 min-w-[180px]"
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-10 w-[160px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 w-[160px] outline-none">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Technician</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Data Center</th>
              <th className="px-6 py-3">Hours</th>
              <th className="px-6 py-3">Workers</th>
              <th className="px-6 py-3">Expenses ($)</th>
              <th className="px-6 py-3">Bill(s)</th>
              {/* <th className="px-6 py-3">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedReports.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium">{r.id}</td>
                <td className="px-6 py-4">{r.date}</td>
                <td className="px-6 py-4">{r.technician}</td>
                <td className="px-6 py-4">{r.client}</td>
                <td className="px-6 py-4">{r.dataCenter}</td>
                <td className="px-6 py-4">{r.hours}</td>
                <td className="px-6 py-4">{r.workers}</td>
                <td className="px-6 py-4">${r.expenses}</td>
                <td className="px-6 py-4">
                  {r.bills && r.bills.length > 0 ? (
                    <button
                      onClick={() => {
                        setSelectedBills(r.bills);
                        setIsBillViewerOpen(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      View Bills
                    </button>
                  ) : (
                    <span className="text-gray-400 italic">No Bill</span>
                  )}
                </td>
                {/* <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      r.status === "Submitted"
                        ? "bg-yellow-100 text-yellow-700"
                        : r.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td> */}
              </tr>
            ))}
            {paginatedReports.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No Work Reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredReports.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Bill Viewer Modal */}
      <BillViewer
        bills={selectedBills}
        open={isBillViewerOpen}
        onClose={() => setIsBillViewerOpen(false)}
      />
    </div>
  );
}
