import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy client/data center data (replace with API)
const CLIENTS = ["Client A", "Client B", "Client C"];
const DATA_CENTERS = [
  "NYC Data Center",
  "SFO Data Center",
  "London Data Center",
];

export default function WorkFormModal({ open, onClose, data, onSave }) {
  const [form, setForm] = useState({
    date: "",
    client: "",
    dataCenter: "",
    workers: "",
    hours: "",
    description: "",
    bills: [],
  });

  // pre-fill if edit mode
  useEffect(() => {
    if (data) {
      setForm({
        date: data.date || "",
        client: data.client || "",
        dataCenter: data.dataCenter || "",
        workers: data.workers || "",
        hours: data.hours || "",
        description: data.description || "",
        bills: data.bills || [],
      });
    } else {
      setForm({
        date: "",
        client: "",
        dataCenter: "",
        workers: "",
        hours: "",
        description: "",
        bills: [],
      });
    }
  }, [data]);

  if (!open) return null;

  const handleFileChange = (e) => {
    setForm({ ...form, bills: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form, data ? "edit" : "add"); // pass mode too
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold">
              {data ? "Edit Work" : "Add New Work"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {data
                ? "Update the details of this work entry."
                : "Fill in the details of today’s work entry."}
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
        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <Select
              value={form.client}
              onValueChange={(value) => setForm({ ...form, client: value })}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {CLIENTS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data Center */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Center
            </label>
            <Select
              value={form.dataCenter}
              onValueChange={(value) =>
                setForm({ ...form, dataCenter: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select data center" />
              </SelectTrigger>
              <SelectContent>
                {DATA_CENTERS.map((dc) => (
                  <SelectItem key={dc} value={dc}>
                    {dc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Workers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Workers
            </label>
            <Input
              type="number"
              placeholder="e.g. 3"
              value={form.workers}
              onChange={(e) => setForm({ ...form, workers: e.target.value })}
            />
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours Worked
            </label>
            <Input
              type="number"
              placeholder="e.g. 5"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Description
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Bills */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attach Bills
            </label>
            <Input type="file" multiple onChange={handleFileChange} />
          </div>

          {/* Footer */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{data ? "Update Work" : "Save Work"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
