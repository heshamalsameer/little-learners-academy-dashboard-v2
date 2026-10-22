import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createFeeStructure,
  editFeeStructure,
  fetchFeeStructureById,
} from "../../redux/slice/feeStructureSlice";
import { AppDispatch, RootState } from "../../redux/store";
import FormShell, { FormActions } from "../../components/common/ui/FormShell";
import { FormSkeleton } from "../../components/common/ui/Skeleton";

const fields = [
  { key: "program", label: "Program", placeholder: "e.g. Junior Kindergarten" },
  { key: "ageGroup", label: "Age Group", placeholder: "e.g. 4-5 years" },
  { key: "annualTuition", label: "Annual Tuition", placeholder: "e.g. $8,500" },
  { key: "registrationFee", label: "Registration Fee", placeholder: "e.g. $300" },
  { key: "activityFee", label: "Activity Fee", placeholder: "e.g. $200" },
] as const;

type FeeForm = Record<(typeof fields)[number]["key"], string>;

const empty: FeeForm = {
  program: "",
  ageGroup: "",
  annualTuition: "",
  registrationFee: "",
  activityFee: "",
};

const AddEditFeeStructure: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, feeStructures } = useSelector((state: RootState) => state.feeStructures);
  const [values, setValues] = useState<FeeForm>(empty);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (id && !feeStructures.some((fs) => fs._id === id)) dispatch(fetchFeeStructureById(id));
  }, [id, dispatch, feeStructures]);

  useEffect(() => {
    if (!id) return;
    const existing = feeStructures.find((fs) => fs._id === id);
    if (existing) {
      setValues({
        program: existing.program ?? "",
        ageGroup: existing.ageGroup ?? "",
        annualTuition: existing.annualTuition ?? "",
        registrationFee: existing.registrationFee ?? "",
        activityFee: existing.activityFee ?? "",
      });
    }
  }, [id, feeStructures]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (id) await dispatch(editFeeStructure({ id, formData: values })).unwrap();
      else await dispatch(createFeeStructure(values)).unwrap();
      toast.success(id ? "Fee structure updated" : "Fee structure added");
      navigate("/FeeStructures");
    } catch {
      toast.error("Something went wrong, please try again");
    } finally {
      setBusy(false);
    }
  };

  const waiting = !!id && loading && !values.program;

  return (
    <FormShell title={id ? "Edit Fee Structure" : "Add Fee Structure"}>
      {waiting ? (
        <FormSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="student-form-form">
          {fields.map((field) => (
            <div key={field.key} className={`form-group ${field.key === "program" ? "full-width" : ""}`}>
              <label htmlFor={field.key}>{field.label}</label>
              <input
                id={field.key}
                value={values[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                required
              />
            </div>
          ))}
          <FormActions busy={busy} isEdit={!!id} onCancel={() => navigate("/FeeStructures")} />
        </form>
      )}
    </FormShell>
  );
};

export default AddEditFeeStructure;
