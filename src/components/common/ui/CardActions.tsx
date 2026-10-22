import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Modal from "../../Modal/Modal";
import { ui } from "./ui";

type TProps = {
  onEdit: () => void;
  onDelete: () => Promise<unknown>;
  className?: string;
};

const CardActions = ({ onEdit, onDelete, className = "" }: TProps) => {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await onDelete();
      toast.success("Item deleted successfully");
      setOpen(false);
    } catch {
      toast.error("Couldn't delete the item, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        type="button"
        aria-label="Edit"
        title="Edit"
        onClick={onEdit}
        className={`${ui.iconBtn} bg-white border-Grey_15 text-Grey_15 hover:bg-Orange_90`}
      >
        <MdEdit />
      </button>
      <button
        type="button"
        aria-label="Delete"
        title="Delete"
        onClick={() => setOpen(true)}
        className={`${ui.iconBtn} bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white`}
      >
        <RiDeleteBin6Line />
      </button>
      <Modal
        open={open}
        busy={busy}
        onClose={() => !busy && setOpen(false)}
        handleClickDelete={confirmDelete}
      />
    </div>
  );
};

export default CardActions;
