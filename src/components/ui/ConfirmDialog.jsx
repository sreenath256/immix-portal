import React from "react";
import Button from "@/components/ui/Button";

export default function ConfirmDialog({
  open,
  setOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        {/* Body */}
        <div className="p-5 text-gray-600">{message}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 border-t">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="min-w-[90px]"
          >
            {cancelText}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="min-w-[110px]"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
