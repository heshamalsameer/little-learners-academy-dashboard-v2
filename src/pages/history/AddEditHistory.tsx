import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { createHistory, editHistory } from "../../redux/history/historyAct";
import { AppDispatch } from "../../redux/store";
import FormShell, { FormActions } from "../../components/common/ui/FormShell";

const AddEditHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const editing = location.state as any;

  const [year, setYear] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (editing) {
      setYear(String(editing.year ?? ""));
      setTitle(editing.title ?? "");
      setDescription(editing.description ?? "");
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const history = { year: Number(year), title, description };
    setBusy(true);
    try {
      if (editing?._id) await dispatch(editHistory({ id: editing._id, history })).unwrap();
      else await dispatch(createHistory(history)).unwrap();
      toast.success(editing ? "History updated" : "History added");
      navigate("/history");
    } catch {
      toast.error("Something went wrong, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormShell title={editing ? "Edit History" : "Add History"}>
      <form onSubmit={handleSubmit} className="student-form-form">
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input id="year" type="number" min={1900} max={2100} value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <FormActions busy={busy} isEdit={!!editing} onCancel={() => navigate("/history")} />
      </form>
    </FormShell>
  );
};

export default AddEditHistory;
