import React, { useState, useEffect } from "react";
import { format, differenceInMinutes } from "date-fns";
import WorkDetailModal from "./WorkDetailModal";
import BillViewer from "@/components/ui/BillViewer";
import Pagination from "@/components/ui/Pagination";
import WorkFormModal from "./WorkFormModal";
import NewRowEditor from "../../components/ui/NewRowEditor";
import { generateWorkReportsData, WORK_TYPES } from "../../data/workReportsData";
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

const DataCenterWorkReports = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    end: new Date(),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  // Modals
  const [billModal, setBillModal] = useState({ open: false, bills: [] });
  const [detailModal, setDetailModal] = useState(null);
  const [formModal, setFormModal] = useState({ open: false, data: null });

  // Inline editing state
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  // New Row Editing State
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);

  const handleNewRowSave = (newRecord) => {
    setRecords(prev => [newRecord, ...prev]);
    setIsAddingNewRow(false);
  };

  // Quick Add Form State
  const [quickAddForm, setQuickAddForm] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    client: "",
    city: "",
    country: "",
    dataCenter: "",
    workType: "Maintenance",
    referenceNumber: "",
    additionalFTsNames: "",
    startTime: "09:00",
    endTime: "17:00",
    priority: "Medium"
  });

  // Dummy Data
  useEffect(() => {
    const data = generateWorkReportsData();
    setRecords(data);
  }, []);

  // Filtering
  useEffect(() => {
    const filtered = records.filter((r) => {
      const recordDate = new Date(r.date);
      return (
        recordDate >= dateRange.start &&
        recordDate <= dateRange.end &&
        (r.client.toLowerCase().includes(search.toLowerCase()) ||
          r.dataCenter.toLowerCase().includes(search.toLowerCase()) ||
          r.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
          r.workType.toLowerCase().includes(search.toLowerCase()) ||
          r.country.toLowerCase().includes(search.toLowerCase()) ||
          r.city.toLowerCase().includes(search.toLowerCase()))
      );
    });

    console.log(filtered)
    setFilteredRecords(filtered);
    setCurrentPage(1);
  }, [records, search, dateRange]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Priority badge colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Work type badge colors
  const getWorkTypeColor = (workType) => {
    switch (workType) {
      case 'Project': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Maintenance': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Emergency': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Installation': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Audit': return 'bg-orange-100 text-orange-800 border border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Inline editing handlers
  const handleCellDoubleClick = (recordId, field, value) => {
    setEditingCell({ recordId, field });
    setEditValue(value);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    if (editingCell) {
      const { recordId, field } = editingCell;

      setRecords(prevRecords =>
        prevRecords.map(record => {
          if (record.id === recordId) {
            const updatedRecord = { ...record, [field]: editValue };

            // Reset city when country is changed
            if (field === 'country') {
              updatedRecord.city = "";
            }

            // Recalculate duration if startTime or endTime is changed
            if (field === 'startTime' || field === 'endTime') {
              const startDateTime = new Date(`${updatedRecord.date}T${updatedRecord.startTime}`);
              const endDateTime = new Date(`${updatedRecord.date}T${updatedRecord.endTime}`);
              const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
              updatedRecord.duration = (durationMinutes / 60).toFixed(1);
            }

            // Update FTs count if FTs names are changed
            if (field === 'additionalFTsNames') {
              const namesArray = editValue.split(',').map(name => name.trim()).filter(name => name);
              updatedRecord.additionalFTs = namesArray.length;
              updatedRecord.additionalFTsNames = namesArray;
            }

            return updatedRecord;
          }
          return record;
        })
      );

      setEditingCell(null);
      setEditValue("");
    }
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // Quick Add Handlers
  const handleQuickAddChange = (field, value) => {
    setQuickAddForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuickAddSave = () => {
    const startDateTime = new Date(`${quickAddForm.date}T${quickAddForm.startTime}`);
    const endDateTime = new Date(`${quickAddForm.date}T${quickAddForm.endTime}`);
    const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
    const duration = (durationMinutes / 60).toFixed(1);

    const additionalFTsNames = quickAddForm.additionalFTsNames
      .split(',')
      .map(name => name.trim())
      .filter(name => name);

    const newRecord = {
      id: Date.now(),
      ...quickAddForm,
      duration,
      additionalFTs: additionalFTsNames.length,
      additionalFTsNames,
      bills: [],
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRecords(prev => [newRecord, ...prev]);

    // Reset form
    setQuickAddForm({
      date: format(new Date(), "yyyy-MM-dd"),
      client: "",
      city: "",
      country: "",
      dataCenter: "",
      workType: "Maintenance",
      referenceNumber: "",
      additionalFTsNames: "",
      startTime: "09:00",
      endTime: "17:00",
      priority: "Medium"
    });
  };

  // Helper function to convert 24-hour format to 12-hour format
  const convertTo12Hour = (time24) => {
    if (!time24) return '';

    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get clients for a specific data center
  const getClientsForDataCenter = (dataCenterName) => {
    const dc = DATA_CENTERS.find(dc => dc.name === dataCenterName);
    return dc ? dc.clients : [];
  };

  // Get cities for a specific country
  const getCitiesForCountry = (countryName) => {
    return cities[countryName] || [];
  };

  // Enhanced editable cell with select boxes
  const renderEditableCell = (record, field, displayValue) => {
    const isEditing = editingCell?.recordId === record.id && editingCell?.field === field;

    if (isEditing) {
      // Date field
      if (field === 'date') {
        return (
          <input
            type="date"
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          />
        );
      }

      // Data Center field
      if (field === 'dataCenter') {
        return (
          <select
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          >
            <option value="">Select Data Center</option>
            {DATA_CENTERS.map(dc => (
              <option key={dc.id} value={dc.name}>{dc.name}</option>
            ))}
          </select>
        );
      }

      // Client field
      if (field === 'client') {
        const clients = getClientsForDataCenter(record.dataCenter);
        return (
          <select
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          >
            <option value="">Select Client</option>
            {clients.map((client, index) => (
              <option key={index} value={client}>{client}</option>
            ))}
          </select>
        );
      }

      // Country field
      if (field === 'country') {
        return (
          <select
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        );
      }

      // City field
      if (field === 'city') {
        const availableCities = getCitiesForCountry(record.country);
        return (
          <select
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            disabled={!record.country}
            className={`w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${!record.country ? 'bg-gray-100 text-gray-400' : ''
              }`}
            autoFocus
          >
            <option value="">
              {!record.country ? 'Select Country first' : availableCities.length === 0 ? 'No cities available' : 'Select City'}
            </option>
            {availableCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        );
      }

      // Work Type field
      if (field === 'workType') {
        return (
          <select
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          >
            {WORK_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        );
      }

      // Time fields (startTime and endTime)
      if (field === 'startTime' || field === 'endTime') {
        return (
          <input
            type="time"
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          />
        );
      }

      // Default text input for other fields
      return (
        <input
          type="text"
          value={editValue}
          onChange={handleEditChange}
          onKeyDown={handleKeyPress}
          onBlur={handleEditSave}
          className="w-full px-1 py-0.5 border border-blue-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          autoFocus
        />
      );
    }

    return (
      <div
        onDoubleClick={() => handleCellDoubleClick(record.id, field, displayValue)}
        className="cursor-pointer hover:bg-blue-50 rounded px-1 min-h-[24px] flex items-center"
        title="Double-click to edit"
      >
        {displayValue}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Work Reports - Data Center</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all data center work activities • Double-click cells to edit
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex gap-2">
            <input
              type="date"
              value={format(dateRange.start, "yyyy-MM-dd")}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: new Date(e.target.value) })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={format(dateRange.end, "yyyy-MM-dd")}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: new Date(e.target.value) })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search client, DC, ticket, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 min-w-[200px]"
            />

            {/* Add Row Button */}
            <button
              onClick={() => setIsAddingNewRow(true)}
              disabled={isAddingNewRow}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap focus:outline-none focus:ring-2 ${isAddingNewRow
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                }`}
            >
              + Add Row
            </button>


            <button
              onClick={() => setFormModal({ open: true, data: null })}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-sm whitespace-nowrap"
            >
              + Add Work
            </button>
          </div>
        </div>
      </div>

      {/* Table Container with Fixed Column Widths */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1400px]">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-32">
                  Date
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-40">
                  Country
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-40">
                  City
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-40">
                  Data Center
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-48">
                  Client
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-32">
                  Work Type
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-36">
                  Reference No.
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-28">
                  Additional FTs Count
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-48">
                  Additional FTs Names
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-40">
                  Time
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-28">
                  Duration
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-28">
                  Total Bills Expense
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-28">
                  Bills
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200 w-28">
                  Work Description
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <NewRowEditor
                isEditing={isAddingNewRow}
                onSave={handleNewRowSave}
                onCancel={() => setIsAddingNewRow(false)}
              />
              {currentRecords.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors group">


                  {/* Date */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-32">
                    {renderEditableCell(r, 'date', r.date)}
                  </td>

                  {/* Country */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-40">
                    {renderEditableCell(r, 'country', r.country)}
                  </td>

                  {/* City */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-40">
                    {renderEditableCell(r, 'city', r.city)}
                  </td>

                  {/* Data Center */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-40">
                    {r.dataCenter}
                  </td>

                  {/* Client */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-48">
                    {renderEditableCell(r, 'client', r.client)}
                  </td>



                  {/* Work Type */}
                  <td className="p-3 text-sm whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-32">
                    {renderEditableCell(r, 'workType', r.workType)}
                  </td>

                  {/* Reference Number */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-36 font-mono">
                    {renderEditableCell(r, 'referenceNumber', r.referenceNumber)}
                  </td>

                  {/* FTs Count */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-28">
                    <div className="text-center">
                      <div className={`font-semibold ${r.additionalFTs > 0 ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                        {r.additionalFTs}
                      </div>
                    </div>
                  </td>

                  {/* FTs Names */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-48">
                    {renderEditableCell(r, 'additionalFTsNames', r.additionalFTsNames.join(', '))}
                  </td>

                  {/* Time */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-40">
                    <div className="space-y-1">
                      {renderEditableCell(r, 'startTime', convertTo12Hour(r.startTime))}
                      {renderEditableCell(r, 'endTime', convertTo12Hour(r.endTime))}
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-28">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded border border-gray-200 text-gray-700">
                      {r.duration}h
                    </span>
                  </td>

                  {/* Total Bill Expense Amount */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-28">
                    <div className="text-center">
                      <div className='font-semibold text-gray-400'>
                        $100
                      </div>
                    </div>
                  </td>

                  {/* Bills */}
                  <td className="p-3 text-sm text-center whitespace-nowrap border-r border-gray-100 group-hover:border-gray-200 w-28">
                    {r.bills.length > 0 ? (
                      <button
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                        onClick={() => setBillModal({ open: true, bills: r.bills })}
                      >
                        View ({r.bills.length})
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* Work Details  */}
                  <td className="p-3 text-sm text-gray-900 whitespace-nowrap  border-r border-gray-100 group-hover:border-gray-200 w-28">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded border border-gray-200 text-gray-700">
                      {r.description}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-sm whitespace-nowrap w-32">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        onClick={() => setDetailModal(r)}
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 text-sm font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors"
                        onClick={() => setFormModal({ open: true, data: r })}
                        title="Edit Record"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Scrollbar Indicator */}
        <div className="bg-gray-100 py-2 px-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {isAddingNewRow ? '↳ Fill in the blue row above to add new record • ' : ''}
              Double-click cells to edit • Scroll horizontally → to view all columns
            </span>
            <span className="font-medium">
              {currentRecords.length} records displayed
              {isAddingNewRow && ' + 1 new row'}
            </span>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 6px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-500">
          Showing {indexOfFirstRecord + 1} -{" "}
          {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
          {filteredRecords.length} records
        </p>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredRecords.length}
          itemsPerPage={recordsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <BillViewer
        bills={billModal.bills}
        open={billModal.open}
        onClose={() => setBillModal({ open: false, bills: [] })}
      />

      <WorkDetailModal data={detailModal} onClose={() => setDetailModal(null)} />

      <WorkFormModal
        open={formModal.open}
        data={formModal.data}
        workTypes={WORK_TYPES}
        dataCenterContext={{
          dataCenter: "DC North America - East",
          country: "United States",
          city: "New York"
        }}
        onClose={() => setFormModal({ open: false, data: null })}
        onSave={(form, mode) => {
          const startDateTime = new Date(`${form.date}T${form.startTime}`);
          const endDateTime = new Date(`${form.date}T${form.endTime}`);
          const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
          const duration = (durationMinutes / 60).toFixed(1);

          if (mode === "add") {
            setRecords([...records, {
              ...form,
              id: Date.now(),
              duration,
              additionalFTs: form.additionalFTsNames?.length || 0,
              status: 'Pending',
              priority: 'Medium'
            }]);
          } else {
            setRecords(
              records.map((r) =>
                r.id === formModal.data.id
                  ? {
                    ...r,
                    ...form,
                    duration,
                    additionalFTs: form.additionalFTsNames?.length || 0
                  }
                  : r
              )
            );
          }
        }}
      />
    </div>
  );
};

export default DataCenterWorkReports;