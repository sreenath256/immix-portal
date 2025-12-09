import Button from "./Button";
import Input from "./Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function AddClientEngineers({
    open,
    setOpen,
    newCompany,
    setNewCompany,
    handleAddCompany,
    isEditing = false,
}) {
    if (!open) return null;

    // Handle phone number change
    const handlePhoneChange = (value, country) => {
        setNewCompany({ 
            ...newCompany, 
            phone: value,
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
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
                {/* header */}
                <div className="flex items-start justify-between p-6 border-b">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {isEditing ? "Edit Client Engineer" : "Add Client Engineer"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {isEditing
                                ? "Update client details."
                                : "Add new client details."}
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
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Engineer Name
                        </label>
                        <Input
                            placeholder="Enter engineer name..."
                            value={newCompany.name}
                            onChange={(e) =>
                                setNewCompany({ ...newCompany, name: e.target.value })
                            }
                        />
                    </div>

                    {/* Phone Number with Country Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <PhoneInput
                            country={'in'}
                            value={newCompany.phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                                required: true,
                                name: 'phone',
                            }}
                            inputStyle={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '48px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                            }}
                            buttonStyle={{
                                border: '1px solid #d1d5db',
                                borderRight: 'none',
                                borderTopLeftRadius: '6px',
                                borderBottomLeftRadius: '6px',
                                backgroundColor: '#f9fafb',
                                height: '38px',
                            }}
                            dropdownStyle={{
                                borderRadius: '6px',
                                border: '1px solid #d1d5db',
                                fontFamily: 'inherit',
                            }}
                            containerStyle={{
                                width: '100%',
                                fontFamily: 'inherit',
                            }}
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input
                            type="email"
                            placeholder="Enter email address..."
                            value={newCompany.email}
                            onChange={(e) =>
                                setNewCompany({ ...newCompany, email: e.target.value })
                            }
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <Input
                            placeholder="Enter address..."
                            value={newCompany.address}
                            onChange={(e) =>
                                setNewCompany({ ...newCompany, address: e.target.value })
                            }
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <Select
                            value={newCompany.status}
                            onValueChange={(value) =>
                                setNewCompany({ ...newCompany, status: value })
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
                    <Button onClick={handleAddCompany}>
                        {isEditing ? "Update Engineer" : "Add Engineer"}
                    </Button>
                </div>
            </div>
        </div>
    );
}