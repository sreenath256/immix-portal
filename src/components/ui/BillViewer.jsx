import React, { useState, useRef } from "react";
import { MoreVertical, X, Upload, Plus } from "lucide-react";

const BillViewer = ({ bills, open, onClose, onBillsUpdate }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    
    // Simulate file processing/upload
    setTimeout(() => {
      const newBills = files.map(file => URL.createObjectURL(file));
      if (onBillsUpdate) {
        onBillsUpdate([...bills, ...newBills]);
      }
      setUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1000);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteBill = (index) => {
    if (onBillsUpdate) {
      const updatedBills = bills.filter((_, i) => i !== index);
      onBillsUpdate(updatedBills);
    }
    setActiveMenu(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[900px] max-w-[95%] max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
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

        {/* Upload Section */}
        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
            />
            
            {uploading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Uploading...</span>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600 mb-3">Click to upload or drag and drop</p>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Upload Bills
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Supports images, PDF, DOC (Max 10MB each)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Bills Grid */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 mb-3">
            Uploaded Bills ({bills?.length || 0})
          </h4>
          
          {bills && bills.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {bills.map((bill, index) => (
                <div key={index} className="relative group border rounded-lg overflow-hidden">
                  <img
                    src={bill}
                    alt={`Bill ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />

                  {/* 3-dot menu button */}
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === index ? null : index)
                    }
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Dropdown menu */}
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
                      <button
                        onClick={() => handleDeleteBill(index)}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 italic">No bills uploaded yet</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={triggerFileInput}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add More Bills
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillViewer;