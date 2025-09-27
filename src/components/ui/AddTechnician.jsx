import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

// Example list of available Data Centers
const AVAILABLE_DATA_CENTERS = [
    "NYC Data Center",
    "SFO Data Center",
    "London Data Center",
    "Singapore Data Center",
    "Tokyo Data Center",
];

export default function AddTechnician({
    open,
    setOpen,
    newTech,
    setNewTech,
    handleAddTechnician,
}) {
    if (!open) return null;

    // local state for multi-select popover
    const [openPopover, setOpenPopover] = useState(false);

    const toggleDataCenter = (dc) => {
        let updated;
        if (newTech.dataCenters?.includes(dc)) {
            updated = newTech.dataCenters.filter((d) => d !== dc);
        } else {
            updated = [...(newTech.dataCenters || []), dc];
        }
        setNewTech({ ...newTech, dataCenters: updated });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />

            {/* modal */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
                {/* header */}
                <div className="flex items-start justify-between p-6 border-b">
                    <div>
                        <h3 className="text-lg font-semibold">Add Field Technician</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Add technician details and assign data centers.
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
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

                {/* body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Technician ID
                        </label>
                        <Input
                            placeholder="e.g. FT1001"
                            value={newTech.id}
                            onChange={(e) => setNewTech({ ...newTech, id: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <Input
                            placeholder="John Doe"
                            value={newTech.name}
                            onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input
                            type="email"
                            placeholder="john@example.com"
                            value={newTech.email}
                            onChange={(e) => setNewTech({ ...newTech, email: e.target.value })}
                        />
                    </div>

                    {/* Multi-select Data Centers */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data Centers
                        </label>
                        <Popover open={openPopover} onOpenChange={setOpenPopover}>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className="w-full h-10 px-3 text-left border rounded-md bg-white hover:bg-gray-50 flex items-center justify-between"
                                >
                                    {newTech.dataCenters && newTech.dataCenters.length > 0 ? (
                                        <span className="truncate">
                                            {newTech.dataCenters.join(", ")}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">Select Data Centers</span>
                                    )}
                                    <svg
                                        className="h-4 w-4 text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-2 bg-white border rounded-md shadow-md">
                                <div className="space-y-2">
                                    {AVAILABLE_DATA_CENTERS.map((dc) => (
                                        <label
                                            key={dc}
                                            className="flex items-center space-x-2 cursor-pointer"
                                        >
                                            <Checkbox
                                                checked={newTech.dataCenters?.includes(dc)}
                                                onCheckedChange={() => toggleDataCenter(dc)}
                                            />
                                            <span className="text-sm">{dc}</span>
                                        </label>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <Select
                            value={newTech.status}
                            onValueChange={(value) =>
                                setNewTech({ ...newTech, status: value })
                            }
                        >
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleAddTechnician();
                        }}
                    >
                        Add Technician
                    </Button>
                </div>
            </div>
        </div>
    );
}
