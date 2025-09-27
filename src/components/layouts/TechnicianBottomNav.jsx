import { useLocation, Link } from "react-router-dom";
import {
  Home,
  BarChart2,
  ClipboardList,
  Settings,
} from "lucide-react";

function TechnicianBottomNav() {
  const { pathname } = useLocation();

  const menuItems = [
    { to: "/technician", icon: <Home size={22} />, label: "Home" },
    { to: "/technician/data-centers", icon: <BarChart2 size={22} />, label: "Data Centers" },
    { to: "/technician/work", icon: <ClipboardList size={22} />, label: "My Work" },
    { to: "/technician/settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-2xl border px-4 py-2 flex justify-between items-center w-[95%] max-w-md z-50">
      {menuItems.map((item, idx) => {
        const active = pathname === item.to;
        return (
          <Link
            key={idx}
            to={item.to}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-md transition ${
              active ? "text-indigo-600 font-medium" : "text-gray-500 hover:text-indigo-500"
            }`}
          >
            {item.icon}
            <span className="text-[11px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default TechnicianBottomNav;
