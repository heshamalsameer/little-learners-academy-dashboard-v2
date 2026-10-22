import React from "react";
import { X } from "react-feather";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ui } from "../common/ui/ui";

type TProps = {
  open: boolean;
  onClose: () => void;
  handleClickDelete: () => void;
  busy?: boolean;
};

const Modal: React.FC<TProps> = ({ open, onClose, handleClickDelete, busy }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center p-4 transition-colors z-50 ${
        open ? "visible bg-Grey_15/40 backdrop-blur-[2px]" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className={`relative bg-white border-2 border-Grey_15 rounded-xl shadow-[5px_5px_0_#262626] p-6 w-full max-w-sm transition-all ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1 rounded-md text-Grey_40 hover:bg-Orange_95 hover:text-Grey_15"
        >
          <X size={18} />
        </button>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 border-2 border-red-200 text-red-500 flex items-center justify-center text-[20px]">
            <RiDeleteBin6Line />
          </div>
          <h3 className="text-[18px] font-[800] text-dimBlack mt-4">Confirm Delete</h3>
          <p className="text-[14px] text-Grey_40 mt-1">
            Are you sure you want to delete this item? This can't be undone.
          </p>
          <div className="flex gap-3 mt-6">
            <button className={`${ui.btn} ${ui.secondary} flex-1`} onClick={onClose} disabled={busy}>
              Cancel
            </button>
            <button className={`${ui.btn} ${ui.danger} flex-1`} onClick={handleClickDelete} disabled={busy}>
              {busy && <span className="btn-spinner" />}
              {busy ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
