import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddCountry({
  open,
  setOpen,
  newCountry,
  setNewCountry,
  handleAddCountry,
  isEditing,
}) {
  if (!open) return null;

  // Mapping of countries to currencies (all lowercase keys for easier matching)
  const countryCurrencyMap = {
    usa: "USD",
    india: "INR",
    uae: "AED",
    germany: "EUR",
    france: "EUR",
    uk: "GBP",
    japan: "JPY",
  };

  // List of available currencies
  const currencies = [
    { code: "USD", label: "USD - US Dollar" },
    { code: "INR", label: "INR - Indian Rupee" },
    { code: "AED", label: "AED - UAE Dirham" },
    { code: "EUR", label: "EUR - Euro" },
    { code: "GBP", label: "GBP - British Pound" },
    { code: "JPY", label: "JPY - Japanese Yen" },
  ];

  // Handle typing country name
  const handleCountryChange = (value) => {
    const updatedCountry = { ...newCountry, name: value };

    // Normalize input to lowercase
    const key = value.trim().toLowerCase();

    // Auto-detect currency
    if (countryCurrencyMap[key]) {
      updatedCountry.currency = countryCurrencyMap[key];
    }

    setNewCountry(updatedCountry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold">
              {isEditing ? "Edit Country" : "Add Country"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isEditing ? "Update country details." : "Add a new country."}
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

        {/* Body */}
        <div className="p-6 grid grid-cols-1 gap-4">
          {/* Country Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country Name
            </label>
            <Input
              placeholder="Enter country name..."
              value={newCountry.name}
              onChange={(e) => handleCountryChange(e.target.value)}
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <Select
              value={newCountry.currency}
              onValueChange={(val) =>
                setNewCountry({ ...newCountry, currency: val })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.label}
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
              value={newCountry.status}
              onValueChange={(val) =>
                setNewCountry({ ...newCountry, status: val })
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCountry}>
            {isEditing ? "Update" : "Add Country"}
          </Button>
        </div>
      </div>
    </div>
  );
}
