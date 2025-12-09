import React from 'react';
import { format, differenceInMinutes } from "date-fns";
import { WORK_TYPES } from "../../data/workReportsData";

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

// Bill Upload Modal Component
const BillUploadModal = ({ isOpen, onClose, onUpload, existingBills = [] }) => {
    const [files, setFiles] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select at least one file to upload");
            return;
        }

        setUploading(true);

        // Simulate file upload process
        try {
            // In a real application, you would upload files to your server here
            const uploadedBills = files.map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                url: URL.createObjectURL(file), // In real app, this would be server URL
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString()
            }));

            // Combine with existing bills
            const allBills = [...existingBills, ...uploadedBills];

            onUpload(allBills);
            setFiles([]);
            onClose();
        } catch (error) {
            alert("Error uploading files: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingBill = (billId) => {
        const updatedBills = existingBills.filter(bill => bill.id !== billId);
        onUpload(updatedBills);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-lg font-semibold">Upload Bills</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    {/* Existing Bills */}
                    {existingBills.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Existing Bills</h4>
                            <div className="space-y-2">
                                {existingBills.map((bill) => (
                                    <div key={bill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                                <span className="text-blue-600 text-xs">📄</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">{bill.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(bill.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <a
                                                href={bill.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                View
                                            </a>
                                            <button
                                                onClick={() => removeExistingBill(bill.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="bill-upload"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <label
                            htmlFor="bill-upload"
                            className="cursor-pointer block"
                        >
                            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                <span className="text-blue-600 text-xl">📎</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                                Click to upload bills or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                                PDF, JPG, PNG, DOC (Max 10MB each)
                            </p>
                        </label>
                    </div>

                    {/* Selected Files Preview */}
                    {files.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Selected Files ({files.length})
                            </h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-blue-600 text-sm">📄</span>
                                            <span className="text-sm text-gray-700 truncate flex-1">
                                                {file.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700 text-sm ml-2"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 p-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading || files.length === 0}
                        className={`px-4 py-2 rounded-lg font-medium ${uploading || files.length === 0
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {uploading ? 'Uploading...' : `Upload ${files.length} File(s)`}
                    </button>
                </div>
            </div>
        </div>
    );
};

const NewRowEditor = ({
    onSave,
    onCancel,
    isEditing,
    currentDataCenter = 'dc1' // Default data center, can be passed as prop
}) => {
    // Get the current data center details
    const currentDC = DATA_CENTERS.find(dc => dc.id === currentDataCenter) || DATA_CENTERS[0];

    const [formData, setFormData] = React.useState({
        date: format(new Date(), "yyyy-MM-dd"),
        dataCenter: currentDC.name,
        client: "",
        country: currentDC.country,
        city: currentDC.city,
        workType: "Maintenance",
        referenceNumber: "",
        additionalFTsNames: "",
        additionalFTsCount: 0,
        startTime: "09:00",
        endTime: "17:00",
        priority: "Medium",
        totalExpense: 0,
        bills: [],
        workDescription: ""
    });

    const [billModalOpen, setBillModalOpen] = React.useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBillUpload = (bills) => {
        setFormData(prev => ({
            ...prev,
            bills: bills
        }));
    };

    const handleSave = () => {
        // Only required validation: date and time
        if (!formData.date) {
            alert("Please select a date");
            return;
        }

        if (!formData.startTime || !formData.endTime) {
            alert("Please enter both start and end time");
            return;
        }

        // Calculate duration
        const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

        // Check if end time is after start time
        if (endDateTime <= startDateTime) {
            alert("End time must be after start time");
            return;
        }

        const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
        const duration = (durationMinutes / 60).toFixed(1);

        // Process FTs names (optional field)
        const additionalFTsNames = formData.additionalFTsNames
            .split(',')
            .map(name => name.trim())
            .filter(name => name);

        const newRecord = {
            id: Date.now(),
            ...formData,
            duration,
            additionalFTs: formData.additionalFTsCount || 0,
            additionalFTsNames: additionalFTsNames.length > 0 ? additionalFTsNames : [],
            totalExpense: formData.totalExpense || 0,
            workDescription: formData.workDescription || "",
            referenceNumber: formData.referenceNumber || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        onSave(newRecord);

        // Reset form (keep data center, country, city as they are fixed)
        setFormData({
            date: format(new Date(), "yyyy-MM-dd"),
            dataCenter: currentDC.name,
            client: "",
            country: currentDC.country,
            city: currentDC.city,
            workType: "Maintenance",
            referenceNumber: "",
            additionalFTsNames: "",
            additionalFTsCount: 0,
            startTime: "09:00",
            endTime: "17:00",
            priority: "Medium",
            totalExpense: 0,
            bills: [],
            workDescription: ""
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 border border-red-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
            default: return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

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

    if (!isEditing) return null;

    return (
        <>
            <tr className="bg-blue-50 border-2 border-blue-200">


                {/* Date - Required */}
                <td className="p-2 border-r border-blue-200 w-32">
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        required
                    />
                </td>

                {/* Country - Display only (not editable) */}
                <td className="p-2 border-r border-blue-200 w-40">
                    <div className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 border border-gray-300">
                        {formData.country}
                    </div>
                </td>

                {/* City - Display only (not editable) */}
                <td className="p-2 border-r border-blue-200 w-40">
                    <div className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 border border-gray-300">
                        {formData.city}
                    </div>
                </td>


                {/* Data Center - Display only (not editable) */}
                <td className="p-2 border-r border-blue-200 w-40">
                    <div className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 border border-gray-300">
                        {formData.dataCenter}
                    </div>
                </td>

                {/* Client - Optional */}
                <td className="p-2 border-r border-blue-200 w-48">
                    <select
                        value={formData.client}
                        required
                        onChange={(e) => handleChange('client', e.target.value)}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                        <option value="">Select Client (Optional)</option>
                        {currentDC.clients.map((client, index) => (
                            <option key={index} value={client}>{client}</option>
                        ))}
                    </select>
                </td>


                {/* Work Type - Optional */}
                <td className="p-2 border-r border-blue-200 w-32">
                    <select
                        value={formData.workType}
                        onChange={(e) => handleChange('workType', e.target.value)}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                        {WORK_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </td>

                {/* Reference Number - Optional */}
                <td className="p-2 border-r border-blue-200 w-36">
                    <input
                        type="text"
                        value={formData.referenceNumber}
                        onChange={(e) => handleChange('referenceNumber', e.target.value)}
                        placeholder="Reference No. (Optional)"
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                </td>

                {/* Additional FTs Count - Optional */}
                <td className="p-2 border-r border-blue-200 w-28">
                    <input
                        type="number"
                        min="0"
                        value={formData.additionalFTsCount}
                        onChange={(e) => handleChange('additionalFTsCount', parseInt(e.target.value) || 0)}
                        placeholder="0 (Optional)"
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                </td>

                {/* FTs Names - Optional */}
                <td className="p-2 border-r border-blue-200 w-48">
                    <input
                        type="text"
                        value={formData.additionalFTsNames}
                        onChange={(e) => handleChange('additionalFTsNames', e.target.value)}
                        placeholder="FT1001, FT1002 (Optional)"
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                </td>

                {/* Time - Required */}
                <td className="p-2 border-r border-blue-200 w-40">
                    <div className="space-y-1">
                        <input
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => handleChange('startTime', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => handleChange('endTime', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                            required
                        />
                    </div>
                </td>

                {/* Duration - Auto calculated */}
                <td className="p-2 border-r border-blue-200 w-28">
                    <span className="font-mono bg-white px-2 py-1 rounded border border-blue-300 text-gray-700 text-sm">
                        {(() => {
                            const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
                            const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
                            const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
                            return durationMinutes > 0 ? `${(durationMinutes / 60).toFixed(1)}h` : '0h';
                        })()}
                    </span>
                </td>

                {/* Total Expense Amount - Optional */}
                <td className="p-2 border-r border-blue-200 w-32">
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.totalExpense}
                            onChange={(e) => handleChange('totalExpense', parseFloat(e.target.value) || 0)}
                            placeholder="0.00 (Optional)"
                            className="w-full px-2 py-1 pl-6 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                </td>

                {/* Bills - Upload Button - Optional */}
                <td className="p-2 border-r border-blue-200 w-28 text-center">
                    <button
                        onClick={() => setBillModalOpen(true)}
                        className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                        title="Upload Bills (Optional)"
                    >
                        {formData.bills.length > 0 ? `Upload (${formData.bills.length})` : 'Upload (Optional)'}
                    </button>
                </td>

                {/* Work Description - Optional */}
                <td className="p-2 border-r border-blue-200 w-64">
                    <textarea
                        value={formData.workDescription}
                        onChange={(e) => handleChange('workDescription', e.target.value)}
                        placeholder="Describe the work performed... (Optional)"
                        rows="3"
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 resize-vertical"
                    />
                </td>

                {/* Actions */}
                <td className="p-2 w-32">
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={!formData.date || !formData.startTime || !formData.endTime}
                            className={`px-3 py-1 rounded text-sm font-medium focus:outline-none focus:ring-2 ${!formData.date || !formData.startTime || !formData.endTime
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                                }`}
                            title="Save Record"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            title="Cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </td>
            </tr>

            {/* Bill Upload Modal */}
            <BillUploadModal
                isOpen={billModalOpen}
                onClose={() => setBillModalOpen(false)}
                onUpload={handleBillUpload}
                existingBills={formData.bills}
            />
        </>
    );
};

export default NewRowEditor;