import React, { useState, useEffect } from "react";
import BillViewer from "@/components/ui/BillViewer";

const WorkDetailModal = ({ data, onClose }) => {
  const [previewBill, setPreviewBill] = useState({ open: false, bills: [] });
  const [hours, setHours] = useState(0);

  // ✅ Hooks must always run, even if data is null
  useEffect(() => {
    if (data && data.startTime && data.endTime) {
      const start = new Date(`1970-01-01T${data.startTime}`);
      const end = new Date(`1970-01-01T${data.endTime}`);
      const diff = (end - start) / (1000 * 60 * 60); // convert ms to hours
      setHours(diff > 0 ? diff.toFixed(2) : 0);
    } else {
      setHours(0);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold">Work Detail</h3>
            <p className="mt-1 text-sm text-gray-500">
              View all details of this work entry.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          <p><b>Date:</b> {data.date}</p>
          <p><b>Client:</b> {data.client}</p>
          <p><b>Data Center:</b> {data.dataCenter}</p>
          <p><b>Workers:</b> {data.workers}</p>

          {/* Time Fields */}
          <p><b>Starting Time:</b> {data.startTime || "Not Provided"}</p>
          <p><b>Ending Time:</b> {data.endTime || "Not Provided"}</p>
          <p><b>Total Hours:</b> {hours} hrs</p>

          {/* Description */}
          <div className="mt-3">
            <b>Description:</b>
            <p className="mt-1 text-gray-700 whitespace-pre-line">
              {data.description && data.description.trim() !== ""
                ? data.description
                : "Not Provided"}
            </p>
          </div>

          <p><b>Created At:</b> {new Date(data.createdAt).toLocaleString()}</p>
          <p><b>Updated At:</b> {new Date(data.updatedAt).toLocaleString()}</p>

          {/* Bills Preview */}
          {data.bills && data.bills.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Bills / Invoices</h4>
              <div className="flex gap-2 flex-wrap">
                {data.bills.map((bill, index) => (
                  <img
                    key={index}
                    src={bill}
                    alt={`Bill ${index + 1}`}
                    className="w-20 h-20 object-cover border rounded cursor-pointer hover:scale-105 transition"
                    onClick={() =>
                      setPreviewBill({ open: true, bills: [bill] })
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>

        {/* Fullscreen Bill Viewer */}
        {previewBill.open && (
          <BillViewer
            bills={previewBill.bills}
            open={previewBill.open}
            onClose={() => setPreviewBill({ open: false, bills: [] })}
          />
        )}
      </div>
    </div>
  );
};

export default WorkDetailModal;
