import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
