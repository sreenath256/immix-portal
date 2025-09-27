import Button from "./Button";
import Input from "./Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddCity({
    open,
    setOpen,
    newCity,
    setNewCity,
    handleAddCity,
    countries,
    isEditing = false,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />

            {/* modal */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
                {/* header */}
                <div className="flex items-start justify-between p-6 border-b">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {isEditing ? "Edit City" : "Add City"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {isEditing ? "Update city details" : "Add city details and assign country."}
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* body */}
                <div className="p-6 grid grid-cols-1 gap-4">
                    {/* City Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City Name
                        </label>
                        <Input
                            placeholder="Enter city name..."
                            value={newCity.name}
                            onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <Select
                            value={newCity.country}
                            onValueChange={(value) => setNewCity({ ...newCity, country: value })}
                        >
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <Select
                            value={newCity.status}
                            onValueChange={(value) =>
                                setNewCity({ ...newCity, status: value })
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
                    <Button onClick={handleAddCity}>
                        {isEditing ? "Update City" : "Add City"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
