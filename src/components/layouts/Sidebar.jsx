import { useState, createContext, useContext } from "react";
import {
  Home,
  Globe,
  MapPin,
  Users,
  BarChart2,
  UserCheck,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LineChart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Sidebar context
const SidebarContext = createContext();

function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen transition-all duration-300 shadow-lg bg-white border-r ${expanded ? "w-64" : "w-20"
        }`}
    >
      <nav className="h-full flex flex-col">
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <img
              src="https://placehold.co/40x40/6366f1/white?text=I"
              alt="Logo"
              className="w-10 h-10 rounded-md"
            />
            {expanded && (
              <span className="font-bold text-lg text-indigo-600">Immix</span>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Menu */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 mt-2 px-2">
            <SidebarItem icon={<Home size={20} />} text="Dashboard" to="/" />
            <SidebarItem icon={<Users size={20} />} text="Clients" to="/clients" />
            <SidebarItem
              icon={<BarChart2 size={20} />}
              text="Data Centers"
              to="/datacenters"
            />
            <SidebarItem
              icon={<MapPin size={20} />}
              text="Cities"
              to="/cities"
            />
            <SidebarItem
              icon={<Globe size={20} />}
              text="Countries"
              to="/countries"
            />
            <SidebarItem
              icon={<UserCheck size={20} />}
              text="Field Technicians"
              to="/technicians"
            />

            {/* Reports Section */}
            <hr className="my-3 border-gray-200" />
            <SidebarItem
              icon={<ClipboardList size={20} />}
              text="Daily Work Entry"
              to="/daily-work"
            />
            <SidebarItem
              icon={<BarChart2 size={20} />}
              text="Work Summary"
              to="/work-summary"
            />
            <SidebarItem
              icon={<LineChart size={20} />}
              text="Reports"
              to="/reports"
            />

            <hr className="my-3 border-gray-200" />
            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              to="/settings"
            />
            <SidebarItem
              icon={<HelpCircle size={20} />}
              text="Help"
              to="/help"
            />
          </ul>
        </SidebarContext.Provider>

        {/* User Info */}
        <div className="border-t p-3 flex items-center gap-2">
          <img
            src="https://placehold.co/40x40/c0c0c0/333333?text=RN"
            alt="User"
            className="w-10 h-10 rounded-md"
          />
          {expanded && (
            <div className="flex-1 flex flex-col justify-center overflow-hidden">
              <h4 className="font-semibold text-gray-800">Reena</h4>
              <span className="text-xs text-gray-500 truncate">
                reena@immix.com
              </span>
            </div>
          )}
          <LogOut
            size={20}
            className="text-gray-600 cursor-pointer hover:text-red-500 transition"
          />
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to, alert }) {
  const { expanded } = useContext(SidebarContext);
  const { pathname } = useLocation();

  const active = pathname === to;

  return (
    <Link to={to}>
      <li
        className={`relative flex items-center gap-3 py-2 px-3 my-1 rounded-md cursor-pointer transition-all
          ${active
            ? "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700"
            : "text-gray-600 hover:bg-indigo-50"
          }
        `}
      >
        {icon}
        {expanded && <span className="flex-1">{text}</span>}

        {alert && (
          <span
            className={`absolute right-3 w-2 h-2 rounded-full bg-indigo-400 ${expanded ? "top-3" : "top-2"
              }`}
          />
        )}

        {/* Tooltip when collapsed */}
        {!expanded && (
          <span
            className="absolute left-full ml-4 px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {text}
          </span>
        )}
      </li>
    </Link>
  );
}

export default Sidebar;
