import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createBenefit, editBenefit, fetchBenefits } from "../../redux/benefit/benefit";
import { AppDispatch, RootState } from "../../redux/store";
import FormShell, { FileField, FormActions } from "../../components/common/ui/FormShell";
import { mediaUrl } from "../../components/common/ui/SimpleListPage";

const AddEditBenefit: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { benefits } = useSelector((state: RootState) => state.benefits);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (benefits.length === 0) dispatch(fetchBenefits());
  }, [dispatch, benefits.length]);

  useEffect(() => {
    if (!id) return;
    const existing = benefits.find((benefit) => benefit._id === id);
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description);
      setIconPreview(mediaUrl(existing.icon) ?? null);
    }
  }, [id, benefits]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (icon) formData.append("icon", icon);
    setBusy(true);
    try {
      if (id) await dispatch(editBenefit({ id, formData })).unwrap();
      else await dispatch(createBenefit(formData)).unwrap();
      toast.success(id ? "Benefit updated" : "Benefit added");
      navigate("/benefits");
    } catch {
      toast.error("Something went wrong, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormShell title={id ? "Edit Benefit" : "Add Benefit"}>
      <form onSubmit={handleSubmit} className="student-form-form">
        <div className="form-group full-width">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <FileField
          label="Icon"
          preview={iconPreview}
          onChange={(file) => {
            setIcon(file);
            setIconPreview(URL.createObjectURL(file));
          }}
        />
        <FormActions busy={busy} isEdit={!!id} onCancel={() => navigate("/benefits")} />
      </form>
    </FormShell>
  );
};

export default AddEditBenefit;
