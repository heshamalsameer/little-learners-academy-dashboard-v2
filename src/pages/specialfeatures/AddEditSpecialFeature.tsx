import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { addSpecialFeature, editSpecialFeature } from "../../redux/specialFeatureAct/specialFeatureAct";
import { AppDispatch } from "../../redux/store";
import FormShell, { FileField, FormActions } from "../../components/common/ui/FormShell";
import { mediaUrl } from "../../components/common/ui/SimpleListPage";

const AddEditSpecialFeature: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const editing = location.state as any;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (editing) {
      setName(editing.name ?? "");
      setDescription(editing.description ?? "");
      setPreview(mediaUrl(editing.image) ?? mediaUrl(editing.icon) ?? null);
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);
    setBusy(true);
    try {
      if (editing?._id) await dispatch(editSpecialFeature({ id: editing._id, specialFeature: formData })).unwrap();
      else await dispatch(addSpecialFeature(formData)).unwrap();
      toast.success(editing ? "Feature updated" : "Feature added");
      navigate("/Specialfeatures");
    } catch {
      toast.error("Something went wrong, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormShell title={editing ? "Edit Special Feature" : "Add Special Feature"}>
      <form onSubmit={handleSubmit} className="student-form-form">
        <div className="form-group full-width">
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <FileField
          label="Icon"
          preview={preview}
          onChange={(file) => {
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />
        <FormActions busy={busy} isEdit={!!editing} onCancel={() => navigate("/Specialfeatures")} />
      </form>
    </FormShell>
  );
};

export default AddEditSpecialFeature;
