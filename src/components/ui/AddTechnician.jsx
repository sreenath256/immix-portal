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
import { Checkbox } from "@/components/ui/checkbox";
import { countries, cities } from "@/data/countries";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Enhanced data structure
const DATA_CENTERS = {
  "India-Mumbai": [
    {
      id: "mumbai-dc-a",
      name: "Mumbai Data Center A",
      clients: ["Reliance Tech", "L&T Infotech", "HDFC Bank"]
    },
    {
      id: "mumbai-dc-b",
      name: "Mumbai Data Center B",
      clients: ["Wipro", "TCS", "Infosys", "Axis Bank"]
    }
  ],
  "India-Delhi": [
    {
      id: "delhi-dc",
      name: "Delhi Data Center",
      clients: ["Paytm", "HCL", "Snapdeal", "Zomato"]
    }
  ],
  "India-Bangalore": [
    {
      id: "bangalore-dc-a",
      name: "Bangalore Data Center A",
      clients: ["Flipkart", "Myntra", "Swiggy", "Ola"]
    },
    {
      id: "bangalore-dc-b",
      name: "Bangalore Data Center B",
      clients: ["Intel", "AMD", "Nvidia", "Qualcomm"]
    }
  ],
  "United States-New York": [
    {
      id: "nyc-dc-a",
      name: "NYC Data Center A",
      clients: ["ABC Corp", "TechWorld", "NextGen", "JPMorgan"]
    },
    {
      id: "nyc-dc-b",
      name: "NYC Data Center B",
      clients: ["InnovaSoft", "XYZ Ltd", "Goldman Sachs", "Morgan Stanley"]
    }
  ],
  "United States-San Francisco": [
    {
      id: "sf-dc",
      name: "San Francisco Data Center",
      clients: ["Google", "Apple", "Meta", "Twitter"]
    }
  ]
};

const TECHNICIAN_COMPANIES = [
  "TechServe Solutions",
  "FieldFix Pvt Ltd",
  "OnSite Engineers",
  "QuickRepair Services",
  "SmartWorks India",
];

// Currency options with conversion rates to USD (example rates)
const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 0.012 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 1.08 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 1.27 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 0.0067 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 0.66 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 0.74 },
];

// Pricing types
const PRICING_TYPES = [
  { value: "fixed", label: "Fixed Amount" },
  { value: "percentage", label: "Percentage (%)" },
];

export default function AddTechnician({
  open,
  setOpen,
  newTech,
  setNewTech,
  handleAddTechnician,
}) {
  if (!open) return null;

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [availableDataCenters, setAvailableDataCenters] = useState([]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setSelectedCountry("");
      setSelectedCity("");
      setAvailableCities([]);
      setAvailableDataCenters([]);
    }
  }, [open]);

  // Update cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      setAvailableCities(cities[selectedCountry] || []);
      setSelectedCity("");
      setAvailableDataCenters([]);
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  // Update Data Centers when city changes
  useEffect(() => {
    if (selectedCountry && selectedCity) {
      const key = `${selectedCountry}-${selectedCity}`;
      const dataCenters = DATA_CENTERS[key] || [];
      setAvailableDataCenters(dataCenters);
    } else {
      setAvailableDataCenters([]);
    }
  }, [selectedCountry, selectedCity]);

  // Calculate USD conversion
  const calculateUSD = (amount, currencyCode, isPercentage = false) => {
    if (!amount || isNaN(amount) || isPercentage) return null;

    const currency = CURRENCIES.find(c => c.code === currencyCode);
    if (!currency) return null;

    return (parseFloat(amount) * currency.rate).toFixed(2);
  };

  // Handle data center selection with client selection
  const handleDataCenterSelect = (dataCenter) => {
    const isSelected = newTech.dataCenters?.some(dc => dc.id === dataCenter.id);

    if (isSelected) {
      // Remove data center and its clients
      const updatedDataCenters = newTech.dataCenters.filter(dc => dc.id !== dataCenter.id);
      setNewTech({
        ...newTech,
        dataCenters: updatedDataCenters
      });
    } else {
      // Add data center with no clients selected initially
      const updatedDataCenters = [
        ...(newTech.dataCenters || []),
        {
          id: dataCenter.id,
          name: dataCenter.name,
          selectedClients: []
        }
      ];
      setNewTech({
        ...newTech,
        dataCenters: updatedDataCenters
      });
    }
  };

  // Handle client selection for a specific data center
  const handleClientToggle = (dataCenterId, client) => {
    const updatedDataCenters = newTech.dataCenters.map(dc => {
      if (dc.id === dataCenterId) {
        const isClientSelected = dc.selectedClients.includes(client);
        return {
          ...dc,
          selectedClients: isClientSelected
            ? dc.selectedClients.filter(c => c !== client)
            : [...dc.selectedClients, client]
        };
      }
      return dc;
    });

    setNewTech({
      ...newTech,
      dataCenters: updatedDataCenters
    });
  };

  // Select all clients for a data center
  const handleSelectAllClients = (dataCenterId) => {
    const dataCenter = availableDataCenters.find(dc => dc.id === dataCenterId);
    if (!dataCenter) return;

    const updatedDataCenters = newTech.dataCenters.map(dc => {
      if (dc.id === dataCenterId) {
        return {
          ...dc,
          selectedClients: [...dataCenter.clients]
        };
      }
      return dc;
    });

    setNewTech({
      ...newTech,
      dataCenters: updatedDataCenters
    });
  };

  // Clear all clients for a data center
  const handleClearAllClients = (dataCenterId) => {
    const updatedDataCenters = newTech.dataCenters.map(dc => {
      if (dc.id === dataCenterId) {
        return {
          ...dc,
          selectedClients: []
        };
      }
      return dc;
    });

    setNewTech({
      ...newTech,
      dataCenters: updatedDataCenters
    });
  };

  // Get selected data center object
  const getSelectedDataCenter = (dataCenterId) => {
    return newTech.dataCenters?.find(dc => dc.id === dataCenterId);
  };

  // Handle price change with validation
  const handlePriceChange = (field, value) => {
    // Allow only numbers and decimal point
    if (value && !/^\d*\.?\d*$/.test(value)) return;

    setNewTech({
      ...newTech,
      [field]: value
    });
  };

  // Get selected currency symbol
  const getCurrencySymbol = () => {
    const currency = CURRENCIES.find(c => c.code === (newTech.currency || "USD"));
    return currency?.symbol || "$";
  };

  // Handle phone number change
  const handlePhoneChange = (value, country) => {
    setNewTech({
      ...newTech,
      mobile: value,
      countryCode: country.countryCode
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 flex flex-col max-h-[90vh]">
        {/* header */}
        <div className="flex items-start justify-between p-6 border-b shrink-0">
          <div>
            <h3 className="text-lg font-semibold">Add Field Technician</h3>
            <p className="mt-1 text-sm text-gray-500">
              Assign access to specific data centers and clients.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Section 1: Personal Details */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-sm mb-4 text-gray-700">
                Personal Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={newTech.name}
                    onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={newTech.email}
                    onChange={(e) =>
                      setNewTech({ ...newTech, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile Number
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={newTech.mobile}
                    onChange={handlePhoneChange}
                    inputProps={{
                      required: true,
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '40px',
                      paddingLeft: '48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                    buttonStyle={{
                      border: '1px solid #d1d5db',
                      borderRight: 'none',
                      borderTopLeftRadius: '6px',
                      borderBottomLeftRadius: '6px',
                      backgroundColor: '#f9fafb',
                    }}
                    dropdownStyle={{
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Company Information */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-sm mb-4 text-gray-700">
                Company Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Technician Company
                  </label>
                  <Select
                    value={newTech.company || ""}
                    onValueChange={(value) =>
                      setNewTech({ ...newTech, company: value })
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Select Technician Company" />
                    </SelectTrigger>
                    <SelectContent>
                      {TECHNICIAN_COMPANIES.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 3: Pricing Information */}
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold text-sm mb-4 text-blue-700">
                Pricing Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Currency
                  </label>
                  <Select
                    value={newTech.currency || "USD"}
                    onValueChange={(value) =>
                      setNewTech({ ...newTech, currency: value })
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Standard Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Standard Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {getCurrencySymbol()}
                    </span>
                    <input
                      type="text"
                      placeholder="0.00"
                      value={newTech.standardPrice || ""}
                      onChange={(e) => handlePriceChange("standardPrice", e.target.value)}
                      className="w-full h-10 pl-8 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {newTech.standardPrice && !isNaN(newTech.standardPrice) && (
                    <p className="text-xs text-gray-600 mt-1">
                      ≈ ${calculateUSD(newTech.standardPrice, newTech.currency || "USD")} USD
                    </p>
                  )}
                </div>

                {/* Off Standard Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Off Standard Price
                  </label>
                  <div className="flex gap-2">
                    <Select
                      value={newTech.offStandardType || "fixed"}
                      onValueChange={(value) =>
                        setNewTech({ ...newTech, offStandardType: value })
                      }
                    >
                      <SelectTrigger className="w-24 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PRICING_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      {newTech.offStandardType === "percentage" && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          %
                        </span>
                      )}
                      <input
                        type="text"
                        placeholder={newTech.offStandardType === "percentage" ? "0" : "0.00"}
                        value={newTech.offStandardPrice || ""}
                        onChange={(e) => handlePriceChange("offStandardPrice", e.target.value)}
                        className="w-full h-10 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  {newTech.offStandardPrice &&
                    !isNaN(newTech.offStandardPrice) &&
                    newTech.offStandardType === "fixed" && (
                      <p className="text-xs text-gray-600 mt-1">
                        ≈ ${calculateUSD(newTech.offStandardPrice, newTech.currency || "USD")} USD
                      </p>
                    )}
                </div>
              </div>

              {/* Pricing Summary */}
              {(newTech.standardPrice || newTech.offStandardPrice) && (
                <div className="mt-4 p-3 bg-white rounded border">
                  <h5 className="text-sm font-medium mb-2 text-gray-700">
                    Pricing Summary
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Standard Price:</span>
                      <span className="ml-2 font-medium">
                        {getCurrencySymbol()}{newTech.standardPrice || "0.00"}
                        {newTech.standardPrice && !isNaN(newTech.standardPrice) && (
                          <span className="text-gray-500 text-xs ml-1">
                            (${calculateUSD(newTech.standardPrice, newTech.currency || "USD")} USD)
                          </span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Off Standard:</span>
                      <span className="ml-2 font-medium">
                        {newTech.offStandardType === "percentage"
                          ? `${newTech.offStandardPrice || "0"}%`
                          : `${getCurrencySymbol()}${newTech.offStandardPrice || "0.00"}`
                        }
                        {newTech.offStandardPrice &&
                          !isNaN(newTech.offStandardPrice) &&
                          newTech.offStandardType === "fixed" && (
                            <span className="text-gray-500 text-xs ml-1">
                              (${calculateUSD(newTech.offStandardPrice, newTech.currency || "USD")} USD)
                            </span>
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Location & Access */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-sm mb-4 text-gray-700">
                Location & Data Center Access
              </h4>

              {/* Location Filter */}
              <div className="mb-6">
                <h5 className="text-sm font-medium mb-3 text-gray-600">
                  Filter by Location
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Country</label>
                    <Select
                      value={selectedCountry}
                      onValueChange={setSelectedCountry}
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select Country" />
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
                  <div>
                    <label className="block text-sm mb-1">City</label>
                    <Select
                      value={selectedCity}
                      onValueChange={setSelectedCity}
                      disabled={!selectedCountry}
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Data Centers Selection */}
              {availableDataCenters.length > 0 && (
                <div className="border rounded-lg p-4 bg-white">
                  <h5 className="font-semibold text-sm mb-3 text-gray-700">
                    Available Data Centers in {selectedCity}
                  </h5>
                  <div className="space-y-3">
                    {availableDataCenters.map((dataCenter) => {
                      const isSelected = newTech.dataCenters?.some(dc => dc.id === dataCenter.id);
                      const selectedDC = getSelectedDataCenter(dataCenter.id);

                      return (
                        <div key={dataCenter.id} className="border rounded-lg p-3">
                          {/* Data Center Header */}
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => handleDataCenterSelect(dataCenter)}
                              />
                              <span className="font-medium text-sm">{dataCenter.name}</span>
                            </label>
                            {isSelected && (
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSelectAllClients(dataCenter.id)}
                                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                >
                                  Select All
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleClearAllClients(dataCenter.id)}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                  Clear All
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Clients Selection */}
                          {isSelected && (
                            <div className="ml-6 mt-2">
                              <p className="text-xs text-gray-600 mb-2">
                                Select clients for {dataCenter.name}:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {dataCenter.clients.map((client) => (
                                  <label key={client} className="flex items-center space-x-2">
                                    <Checkbox
                                      checked={selectedDC?.selectedClients.includes(client)}
                                      onCheckedChange={() => handleClientToggle(dataCenter.id, client)}
                                    />
                                    <span className="text-sm">{client}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Access Summary */}
              {newTech.dataCenters?.length > 0 && (
                <div className="mt-4 border rounded-lg p-4 bg-green-50">
                  <h5 className="font-semibold text-sm mb-3 text-green-800">
                    ✅ Access Summary
                  </h5>
                  <div className="space-y-2">
                    {newTech.dataCenters.map((dc) => {
                      const availableDC = availableDataCenters.find(adc => adc.id === dc.id);
                      return (
                        <div key={dc.id} className="text-sm">
                          <div className="font-medium text-green-700">{dc.name}</div>
                          <div className="ml-4 text-green-600">
                            {dc.selectedClients.length > 0 ? (
                              <span>
                                Clients: {dc.selectedClients.join(", ")}
                                {dc.selectedClients.length === availableDC?.clients.length && (
                                  <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                                    All Clients
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span className="text-orange-600">No clients selected</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex justify-end gap-3 p-6 border-t shrink-0 bg-white">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleAddTechnician()}
            disabled={!newTech.company || !newTech.id || !newTech.name || !newTech.email || !newTech.mobile}
          >
            Add Technician
          </Button>
        </div>
      </div>
    </div >
  );
}