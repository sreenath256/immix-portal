import React from "react";
import { Link } from "react-router-dom";
import { Globe, MapPin, Users, UserCheck, Building2 } from "lucide-react";

export default function Settings() {
  const settingsItems = [
    
    {
      title: "Countries",
      icon: <Globe size={20} />,
      link: "/countries",
      description: "Add or update countries",
    },
    {
      title: "Cities",
      icon: <MapPin size={20} />,
      link: "/cities",
      description: "Add or update cities",
    },
    {
      title: "Technician Companies",
      icon: <Building2  size={20} />,
      link: "/technician-companies",
      description: "Add or update Technician Companies",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Settings</h1>

      <div className="bg-white shadow rounded-lg divide-y border">
        {settingsItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-600">{item.icon}</div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">
              Manage →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
