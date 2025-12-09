import React, { useState, useEffect, useRef } from "react";
import { format, differenceInMinutes } from "date-fns";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORK_TYPES } from "../../data/workReportsData";
import { countries, cities } from "../../data/countries";

// Mock data for data centers and their clients
const DATA_CENTERS = [
  {
    id: 'dc1',
    name: 'DC North America - East',
    clients: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'],
    country: "United States",
    city: "New York"
  },
  {
    id: 'dc2',
    name: 'DC Europe - Central',
    clients: ['SAP', 'Spotify', 'Booking.com', 'ASML', 'Philips'],
    country: "Germany",
    city: "Frankfurt"
  },
  {
    id: 'dc3',
    name: 'DC Asia - Singapore',
    clients: ['Alibaba', 'Tencent', 'Sony', 'Samsung', 'Rakuten'],
    country: "Singapore",
    city: "Singapore"
  },
  {
    id: 'dc4',
    name: 'DC Australia - Sydney',
    clients: ['Atlassian', 'Canva', 'Afterpay', 'CSL', 'Telstra'],
    country: "Australia",
    city: "Sydney"
  }
];

// Available FTs
const AVAILABLE_FTS = [
  "Field Technician 1",
  "Field Technician 2",
  "Field Technician 3",
  "Field Technician 4",
  "Field Technician 5",
  "Field Technician 6",
  "Field Technician 7",
  "Field Technician 8",
  "Field Technician 9",
  "Field Technician 10",
  "Field Technician 11",
  "Field Technician 12",
  "Field Technician 13",
  "Field Technician 14",
  "Field Technician 15",
  "Field Technician 16",
  "Field Technician 17",
  "Field Technician 18",
  "Field Technician 19",
  "Field Technician 20",
];

const CLIENT_ENGINEERS = [
  "Client Engineer 1",
  "Client Engineer 2",
  "Client Engineer 3",
  "Client Engineer 4",
  "Client Engineer 5",
  "Client Engineer 6",
  "Client Engineer 7",
  "Client Engineer 8",
  "Client Engineer 9",
  "Client Engineer 10",
];

export default function WorkFormModal({
  open,
  onClose,
  data,
  onSave,
  // New props for data center context
  dataCenterContext = null // { dataCenter: 'DC North America - East', country: 'United States', city: 'New York' }
}) {
  const [form, setForm] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    dataCenter: "",
    client: "",
    country: "",
    city: "",
    workType: "Maintenance",
    referenceNumber: "",
    additionalFTsCount: 0,
    additionalFTsNames: [],
    startTime: "",
    endTime: "",
    duration: "",
    standardDuration: "",
    offStandardDuration: "",
    totalExpense: 0,
    bills: [],
    description: "",
  });

  const [isFTDropdownOpen, setIsFTDropdownOpen] = useState(false);
  const ftDropdownRef = useRef(null);

  // Get clients for selected data center
  const getClientsForDataCenter = (dataCenterName) => {
    const dc = DATA_CENTERS.find(dc => dc.name === dataCenterName);
    return dc ? dc.clients : [];
  };

  // Get cities for selected country
  const getCitiesForCountry = (countryName) => {
    return cities[countryName] || [];
  };

  // Initialize form based on context and edit data
  useEffect(() => {
    if (data) {
      // Edit mode - use the data from the record
      // Ensure additionalFTsNames is always an array
      const additionalFTsNames = Array.isArray(data.additionalFTsNames)
        ? data.additionalFTsNames
        : (data.additionalFTsNames || "").split(',').map(name => name.trim()).filter(name => name);

      setForm({
        date: data.date || format(new Date(), "yyyy-MM-dd"),
        dataCenter: data.dataCenter || "",
        client: data.client || "",
        country: data.country || "",
        city: data.city || "",
        workType: data.workType || "Maintenance",
        referenceNumber: data.referenceNumber || "",
        additionalFTsCount: data.additionalFTsCount || 0,
        additionalFTsNames: additionalFTsNames,
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        duration: data.duration || "",
        standardDuration: data.standardDuration || "",
        offStandardDuration: data.offStandardDuration || "",
        totalExpense: data.totalExpense || 0,
        bills: data.bills || [],
        description: data.description || "",
      });
    } else if (dataCenterContext) {
      // New record from data center page - pre-fill with context
      setForm({
        date: format(new Date(), "yyyy-MM-dd"),
        dataCenter: dataCenterContext.dataCenter || "",
        client: "",
        country: dataCenterContext.country || "",
        city: dataCenterContext.city || "",
        workType: "Maintenance",
        referenceNumber: "",
        additionalFTsCount: 0,
        additionalFTsNames: [],
        startTime: "",
        endTime: "",
        duration: "",
        standardDuration: "",
        offStandardDuration: "",
        totalExpense: 0,
        bills: [],
        description: "",
      });
    } else {
      // New record from home page - empty form
      setForm({
        date: format(new Date(), "yyyy-MM-dd"),
        dataCenter: "",
        client: "",
        country: "",
        city: "",
        workType: "Maintenance",
        referenceNumber: "",
        additionalFTsCount: 0,
        additionalFTsNames: [],
        startTime: "",
        endTime: "",
        duration: "",
        standardDuration: "",
        offStandardDuration: "",
        totalExpense: 0,
        bills: [],
        description: "",
      });
    }
  }, [data, dataCenterContext, open]); // Reset when modal opens/closes or context changes

  // Calculate duration when start or end time changes
  useEffect(() => {
    if (form.startTime && form.endTime) {
      const startDateTime = new Date(`1970-01-01T${form.startTime}`);
      let endDateTime = new Date(`1970-01-01T${form.endTime}`);

      // Handle cross-midnight case: if end time is before start time, it means next day
      if (endDateTime < startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      let standardMinutes = 0;
      let offStandardMinutes = 0;

      const current = new Date(startDateTime);
      // Iterate minute by minute
      while (current < endDateTime) {
        const hour = current.getHours();
        // Standard time is 08:00 to 20:00 (8 AM to 8 PM)
        if (hour >= 8 && hour < 20) {
          standardMinutes++;
        } else {
          offStandardMinutes++;
        }
        current.setMinutes(current.getMinutes() + 1);
      }

      const formatDuration = (totalMinutes) => {
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        return `${h}h ${m}m`;
      };

      const duration = formatDuration(standardMinutes + offStandardMinutes);
      const standardDuration = formatDuration(standardMinutes);
      const offStandardDuration = formatDuration(offStandardMinutes);

      setForm(prev => ({
        ...prev,
        duration,
        standardDuration,
        offStandardDuration
      }));
    }
  }, [form.startTime, form.endTime]);

  // Auto-fill country and city when data center is selected (only for home page)
  useEffect(() => {
    if (form.dataCenter && !dataCenterContext) {
      const selectedDC = DATA_CENTERS.find(dc => dc.name === form.dataCenter);
      if (selectedDC) {
        setForm(prev => ({
          ...prev,
          country: selectedDC.country,
          city: selectedDC.city
        }));
      }
    }
  }, [form.dataCenter, dataCenterContext]);

  // Update additionalFTsCount when additionalFTsNames changes
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      additionalFTsCount: prev.additionalFTsNames.length
    }));
  }, [form.additionalFTsNames]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ftDropdownRef.current && !ftDropdownRef.current.contains(event.target)) {
        setIsFTDropdownOpen(false);
      }
    };

    if (isFTDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFTDropdownOpen]);

  const handleFileChange = (e) => {
    setForm({ ...form, bills: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process additional FTs names - already an array, no need to split
    const processedForm = {
      ...form,
      additionalFTsNames: form.additionalFTsNames, // Keep as array
      additionalFTsCount: form.additionalFTsNames.length // Sync count
    };

    onSave?.(processedForm, data ? "edit" : "add");
    onClose();
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));

    // Reset city when country changes (only for home page)
    if (field === 'country' && !dataCenterContext) {
      setForm(prev => ({ ...prev, city: "" }));
    }

    // Reset client when data center changes
    if (field === 'dataCenter') {
      setForm(prev => ({ ...prev, client: "" }));

      // Auto-fill country and city when data center is selected (only for home page)
      if (!dataCenterContext) {
        const selectedDC = DATA_CENTERS.find(dc => dc.name === value);
        if (selectedDC) {
          setForm(prev => ({
            ...prev,
            country: selectedDC.country,
            city: selectedDC.city
          }));
        }
      }
    }
  };

  // Handle FT selection
  const handleFTSelection = (ft) => {
    const isSelected = form.additionalFTsNames.includes(ft);
    let updatedFTs;

    if (isSelected) {
      // Remove FT from selection
      updatedFTs = form.additionalFTsNames.filter(f => f !== ft);
    } else {
      // Add FT to selection
      updatedFTs = [...form.additionalFTsNames, ft];
    }

    setForm(prev => ({
      ...prev,
      additionalFTsNames: updatedFTs
    }));
  };

  // Handle select all FTs
  const handleSelectAllFTs = () => {
    if (form.additionalFTsNames.length === AVAILABLE_FTS.length) {
      // If all are selected, clear all
      setForm(prev => ({ ...prev, additionalFTsNames: [] }));
    } else {
      // Select all available FTs
      setForm(prev => ({ ...prev, additionalFTsNames: [...AVAILABLE_FTS] }));
    }
  };

  // Remove selected FT
  const removeSelectedFT = (ft) => {
    const updatedFTs = form.additionalFTsNames.filter(f => f !== ft);
    setForm(prev => ({ ...prev, additionalFTsNames: updatedFTs }));
  };

  // Check if fields are locked (from data center context)
  const isFieldLocked = (field) => {
    if (!dataCenterContext) return false;

    const lockedFields = {
      dataCenter: true,
      country: true,
      city: true
    };

    return lockedFields[field] || false;
  };

  // Get display text for dropdown trigger
  const getFTDropdownText = () => {
    if (form.additionalFTsNames.length === 0) {
      return "Select FTs";
    } else if (form.additionalFTsNames.length === 1) {
      return form.additionalFTsNames[0];
    } else {
      return `${form.additionalFTsNames.length} FTs selected`;
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-0">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-auto 
            max-h-[90vh] overflow-y-auto pb-[calc(env(safe-area-inset-bottom,20px)+70px)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  {data ? "Edit Work Record" : "Add New Work Record"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  {dataCenterContext && !data
                    ? `Creating record for ${dataCenterContext.dataCenter}`
                    : data
                      ? "Update the work record details."
                      : "Fill in the details of the work record."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md hover:bg-gray-100"
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
              className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* 1. Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                />
              </div>

              {/* 4. Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <Select
                  value={form.country}
                  onValueChange={(value) => handleFormChange('country', value)}
                  disabled={isFieldLocked('country')}
                >
                  <SelectTrigger className={`w-full h-10 ${isFieldLocked('country') ? 'bg-gray-100' : ''}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country, index) => (
                      <SelectItem key={index} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 5. City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Select
                  value={form.city}
                  onValueChange={(value) => handleFormChange('city', value)}
                  disabled={isFieldLocked('city') || !form.country || getCitiesForCountry(form.country).length === 0}
                >
                  <SelectTrigger className={`w-full h-10 ${isFieldLocked('city') || !form.country ? 'bg-gray-100' : ''}`}>
                    <SelectValue
                      placeholder={
                        !form.country
                          ? "Select country first"
                          : getCitiesForCountry(form.country).length === 0
                            ? "No cities available"
                            : "Select city"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {getCitiesForCountry(form.country).map((city, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Data Center */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Center
                </label>
                <Select
                  value={form.dataCenter}
                  onValueChange={(value) => handleFormChange('dataCenter', value)}
                  disabled={isFieldLocked('dataCenter')}
                >
                  <SelectTrigger className={`w-full h-10 ${isFieldLocked('dataCenter') ? 'bg-gray-100' : ''}`}>
                    <SelectValue placeholder="Select data center" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATA_CENTERS.map((dc) => (
                      <SelectItem key={dc.id} value={dc.name}>
                        {dc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <Select
                  value={form.client}
                  onValueChange={(value) => handleFormChange('client', value)}
                  disabled={!form.dataCenter}
                >
                  <SelectTrigger className={`w-full h-10 ${!form.dataCenter ? 'bg-gray-100' : ''}`}>
                    <SelectValue placeholder={form.dataCenter ? "Select client" : "Select data center first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {getClientsForDataCenter(form.dataCenter).map((client, index) => (
                      <SelectItem key={index} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 6. Work Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Type
                </label>
                <Select
                  value={form.workType}
                  onValueChange={(value) => handleFormChange('workType', value)}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 7. Reference Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter reference number"
                  value={form.referenceNumber}
                  onChange={(e) => handleFormChange('referenceNumber', e.target.value)}
                />
              </div>

              {/* 8. Number of Additional FTs (read-only, auto-calculated) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Additional FTs
                </label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.additionalFTsCount}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-calculated based on selection</p>
              </div>

              {/* 9. Additional FTs Multi-Select Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Additional FTs
                </label>

                <div className="relative" ref={ftDropdownRef}>
                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between h-10 px-3 border border-gray-300 rounded-md text-sm text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isFTDropdownOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}`}
                    onClick={() => setIsFTDropdownOpen(!isFTDropdownOpen)}
                  >
                    <span className={`truncate ${form.additionalFTsNames.length === 0 ? 'text-gray-400' : ''}`}>
                      {getFTDropdownText()}
                    </span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform ${isFTDropdownOpen ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isFTDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {/* Select All Option */}
                      {/* <div className="sticky top-0 bg-white border-b px-3 py-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.additionalFTsNames.length === AVAILABLE_FTS.length}
                            onChange={handleSelectAllFTs}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {form.additionalFTsNames.length === AVAILABLE_FTS.length ? 'Deselect All' : 'Select All'}
                          </span>
                        </label>
                      </div> */}

                      {/* FT Options */}
                      <div className="py-1">
                        {AVAILABLE_FTS.map((ft) => {
                          const isSelected = form.additionalFTsNames.includes(ft);
                          return (
                            <div
                              key={ft}
                              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${isSelected ? 'bg-blue-50' : ''}`}
                              onClick={() => handleFTSelection(ft)}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => { }}
                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className={`ml-2 text-sm ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                                {ft}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected FTs display */}
                {form.additionalFTsNames.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">
                      Selected FTs ({form.additionalFTsNames.length}):
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {form.additionalFTsNames.map((ft) => (
                        <span
                          key={ft}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs"
                        >
                          {ft}
                          <button
                            type="button"
                            onClick={() => removeSelectedFT(ft)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 10. Client Engineer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Engineer
                </label>
                <Select
                  value={form.clientEngineer}
                  onValueChange={(value) => handleFormChange('clientEngineer', value)}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select client engineer" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Assume CLIENT_ENGINEERS is an array of strings like ['John Doe', 'Jane Smith'] */}
                    {CLIENT_ENGINEERS.map((engineer) => (
                      <SelectItem key={engineer} value={engineer}>
                        {engineer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              {/* 10. Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <Input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => handleFormChange('startTime', e.target.value)}
                />
              </div>

              {/* 11. End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <Input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => handleFormChange('endTime', e.target.value)}
                />
              </div>

              {/* 12. Standard Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Duration (8AM-8PM)
                </label>
                <Input
                  type="text"
                  value={form.standardDuration}
                  readOnly
                  className="bg-gray-50"
                  placeholder="0h 0m"
                />
              </div>

              {/* 13. Off-Standard Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Off-Standard Duration
                </label>
                <Input
                  type="text"
                  value={form.offStandardDuration}
                  readOnly
                  className="bg-gray-50"
                  placeholder="0h 0m"
                />
              </div>

              {/* 14. Total Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Duration
                </label>
                <Input
                  type="text"
                  value={form.duration}
                  readOnly
                  className="bg-gray-50"
                  placeholder="0h 0m"
                />
              </div>

              {/* 13. Total Bill Expense */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Bill Expense ($)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.totalExpense}
                  onChange={(e) => handleFormChange('totalExpense', parseFloat(e.target.value) || 0)}
                />
              </div>

              {/* 14. Bills Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Bills
                </label>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                {form.bills.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {form.bills.length} file(s) selected
                  </p>
                )}
              </div>

              {/* 15. Work Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Describe the work performed..."
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                />
              </div>

              {/* Footer */}
              <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t sticky bg-white pb-safe">
                <Button
                  variant="outline"
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {data ? "Update Record" : "Save Record"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}