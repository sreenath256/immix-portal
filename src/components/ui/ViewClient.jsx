import React from "react";
import Button from "@/components/ui/Button";

export default function ViewClient({ open, setOpen, client }) {
  if (!open || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Client Details</h3>
          <button
            onClick={() => setOpen(false)}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

          <DetailItem label="Client Name" value={client.name} />

          <DetailItem label="Registered Country" value={client.registeredCountry} />

          <DetailItem label="Registered City" value={client.registeredCity} />

          <DetailItem label="Email" value={client.email} />

          <DetailItem label="Phone Number" value={client.phone} />

          <DetailItem label="Status" value={client.status}
            valueClass={client.status === "Active" ? "text-green-600" : "text-red-600"}
          />

          <DetailItem label="Pincode" value={client.pincode} />

          <DetailItem label="Commute Hourly Rate" value={`₹ ${client.commuteRate}`} />

          {/* Address Full Width */}
          <DetailItem label="Address" value={client.address} full />

          {/* Data Centers */}
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-600 mb-1">Selected Data Centers</p>

            {client.dataCenters?.length > 0 ? (
              <ul className="list-disc ml-5 space-y-1">
                {client.dataCenters.map((dc, i) => (
                  <li key={i} className="font-semibold">
                    {dc.country} — {dc.city}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No data centers selected</p>
            )}
          </div>

          {/* Pricing */}
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-600 mb-1">Pricing (Per Country)</p>

            {client.pricing?.length > 0 ? (
              <ul className="list-disc ml-5 space-y-1">
                {client.pricing.map((item, i) => (
                  <li key={i} className="font-semibold">
                    {item.country}: ₹ {item.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No pricing data available</p>
            )}
          </div>

          {/* Off Standard Price */}
          <DetailItem
            label="Off Standard Price Type"
            value={client.offStandardPrice?.type}
          />

          <DetailItem
            label="Off Standard Price Value"
            value={client.offStandardPrice?.value}
          />

        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, full = false, valueClass = "" }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={`text-base font-semibold mt-1 ${valueClass}`}>
        {value || "—"}
      </p>
    </div>
  );
}
