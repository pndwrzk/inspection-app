import { forwardRef, useImperativeHandle, useState } from "react";

interface AlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface AlertDialogHandle {
  open: () => void;
  close: () => void;
}

const AlertDialog = forwardRef<AlertDialogHandle, AlertDialogProps>(
  ({ title, description, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); // tipe boolean untuk isOpen
    const [showDialog, setShowDialog] = useState<boolean>(false); // tipe boolean untuk showDialog

    // Handler untuk membuka dan menutup dialog
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
        setTimeout(() => setShowDialog(true), 10); // Delay untuk efek transisi
      },
      close: () => {
        setShowDialog(false);
        setTimeout(() => setIsOpen(false), 300); // Durasi untuk transisi hilang
      },
    }));

    // Fungsi untuk menangani tombol cancel
    const handleCancel = (): void => {
      // Mulai animasi keluar
      setShowDialog(false);
      // Menutup dialog setelah transisi selesai
      setTimeout(() => setIsOpen(false), 300);
    };

    if (!isOpen && !showDialog) return null;

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
          showDialog ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow-lg max-w-sm w-full transition-transform duration-300 transform ${
            showDialog ? "scale-100" : "scale-95"
          }`}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold text-center">{title}</h2>
            <p className="text-gray-500 text-center mt-2">{description}</p>
          </div>

          <div className="mt-4 flex justify-end space-x-2 border-t-2">
            <div className="p-4 flex gap-3">
              <button
                onClick={handleCancel} // Menangani klik cancel
                className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setIsOpen(false); // Menutup dialog setelah konfirmasi
                }}
                className="px-4 py-2 text-white bg-[#9F0504] rounded-lg hover:bg-red-700"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AlertDialog;
