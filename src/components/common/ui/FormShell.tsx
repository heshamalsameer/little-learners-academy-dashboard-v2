import React from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { ui } from "./ui";
import "../../Forms/Forms.css";

type TProps = {
  title: string;
  children: React.ReactNode;
};

const FormShell: React.FC<TProps> = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="flex flex-wrap items-center gap-4 mb-7">
        <button className={`${ui.btn} ${ui.secondary}`} onClick={() => navigate(-1)}>
          <RiArrowLeftLine size={18} /> Back
        </button>
        <h1 className="text-[22px] md:text-[26px] font-[800] text-dimBlack leading-tight">{title}</h1>
      </div>
      <div className={`${ui.card} p-5 md:p-8 max-w-4xl`}>{children}</div>
    </div>
  );
};

export const FileField: React.FC<{
  label: string;
  preview: string | null;
  onChange: (file: File) => void;
}> = ({ label, preview, onChange }) => (
  <div className="form-group full-width">
    <span className="field-label">{label}</span>
    <label className="relative flex flex-col items-center justify-center gap-2 h-36 rounded-lg border-2 border-dashed border-Grey_15/40 bg-Orange_97 cursor-pointer hover:border-primary transition-colors">
      {preview ? (
        <img src={preview} alt="" className="h-24 w-24 object-contain" />
      ) : (
        <>
          <span className="text-[28px] text-primary">+</span>
          <span className="text-[14px] text-Grey_40">Click to choose an image</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </label>
  </div>
);

export const FormActions: React.FC<{ busy: boolean; isEdit: boolean; onCancel: () => void }> = ({
  busy,
  isEdit,
  onCancel,
}) => (
  <div className="flex flex-wrap justify-end gap-3 w-full pt-2">
    <button type="button" onClick={onCancel} className={`${ui.btn} ${ui.secondary} h-11 px-5`}>
      Cancel
    </button>
    <button type="submit" disabled={busy} className={`${ui.btn} ${ui.primary} h-11 px-6`}>
      {busy && <span className="btn-spinner" />}
      {isEdit ? "Save Changes" : "Add Item"}
    </button>
  </div>
);

export default FormShell;
