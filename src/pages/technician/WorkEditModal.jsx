import React from "react";

const WorkEditModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Work</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Work updated (dummy)");
            onClose();
          }}
          className="space-y-4"
        >
          <input type="date" defaultValue={data.date} required className="w-full border p-2 rounded" />
          <input type="text" defaultValue={data.client} required className="w-full border p-2 rounded" />
          <input type="text" defaultValue={data.dataCenter} required className="w-full border p-2 rounded" />
          <input type="number" defaultValue={data.workers} required className="w-full border p-2 rounded" />
          <input type="number" defaultValue={data.hours} required className="w-full border p-2 rounded" />
          <textarea defaultValue={data.description} className="w-full border p-2 rounded" />
          <input type="file" multiple className="w-full border p-2 rounded" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkEditModal;
