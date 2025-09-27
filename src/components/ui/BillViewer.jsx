import React, { useState } from "react";
import { MoreVertical, X } from "lucide-react";

const BillViewer = ({ bills, open, onClose }) => {
  const [activeMenu, setActiveMenu] = useState(null); // track which image menu is open

  if (!open) return null;

  const handleSave = (bill) => {
    const link = document.createElement("a");
    link.href = bill;
    link.download = bill.split("/").pop();
    link.click();
    setActiveMenu(false);
  };

  const handleFullscreen = (bill) => {
    window.open(bill, "_blank");
    setActiveMenu(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose} // close on background click
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[900px] max-w-[95%] max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Attached Bills</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Bills Grid */}
        {bills && bills.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {bills.map((bill, index) => (
              <div key={index} className="relative group">
                <img
                  src={bill}
                  alt={`Bill ${index + 1}`}
                  className="w-full h-64 object-cover rounded shadow"
                />

                {/* 3-dot button on image */}
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === index ? null : index)
                  }
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5 text-gray-700" />
                </button>

                {/* Dropdown for that image */}
                {activeMenu === index && (
                  <div className="absolute top-10 right-2 w-40 bg-white border rounded shadow-lg z-50">
                    <button
                      onClick={() => handleSave(bill)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Save Bill
                    </button>
                    <button
                      onClick={() => handleFullscreen(bill)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Fullscreen
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No bills available</p>
        )}
      </div>
    </div>
  );
};

export default BillViewer;
