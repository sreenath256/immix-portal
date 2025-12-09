import React from "react";
import { Users, FileText, Clock, Database } from "lucide-react";

const stats = [
  {
    title: "Today's Work Entries",
    value: "12",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
    color: "bg-blue-50",
  },
  {
    title: "Total Clients",
    value: "8",
    icon: <Users className="h-6 w-6 text-green-500" />,
    color: "bg-green-50",
  },
  {
    title: "Active Data Centers",
    value: "3",
    icon: <Database className="h-6 w-6 text-orange-500" />,
    color: "bg-orange-50",
  },
  {
    title: "Hours Worked Today",
    value: "27.5 hrs",
    icon: <Clock className="h-6 w-6 text-purple-500" />,
    color: "bg-purple-50",
  },
];

const Home = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl shadow-sm border hover:shadow-md transition-all ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
              </div>
              <div className="p-3 bg-white rounded-full shadow-sm">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Recent Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Recent Work Entries
        </h3>
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <p className="text-gray-500 text-sm">
            No recent entries found today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
