import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addAdmissionProcess,
  updateAdmissionProcess,
} from "../../../redux/slice/admissionProcess/admissionProcessSlice";
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";

type Inputs = {
  step: string;
  description: string;
};

const AdmissionProcessForm = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { admissionProcess, isLoading, error } = useAppSelector(
    (state) => state.admissionProcessSlice
  );

  const navigate = useNavigate();

  const [step, setStep] = useState("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const admissionProces = admissionProcess.find((item) => item._id === id);
      if (admissionProces) {
        setStep(admissionProces.step);
        setDescription(admissionProces.description);
      }
    }
  }, [id, isUpdateMode, admissionProcess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      step,
      description,
    },
  });

  useEffect(() => {
    reset({ step, description });
  }, [step, description, reset]);

  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("step", data.step);
    form.append("description", data.description);

    const action = isUpdateMode
      ? updateAdmissionProcess({ id: id, data: form })
      : addAdmissionProcess({ step: data.step, description: data.description });

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/admissionProcess");
      })
      .catch(() => toast.error("Something went wrong, please try again"));
  };

  return (
    <Loading status={isLoading} error={error} variant="form" hasData>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="Name">step</label>
          <input
            id="step"
            type="text"
            placeholder="Enter step"
            {...register("step", { required: "The Name is Required" })}
          />
          {errors.step && (
            <span className="text-red-400">{errors.step.message}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter Description"
            rows={4}
            {...register("description", {
              minLength: { value: 10, message: "Too Short Description" },
            })}
          ></textarea>
          {errors.description && (
            <span className="text-red-400">{errors.description.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={isLoading === "Pending"}>
          {isLoading === "Pending" && <span className="btn-spinner" />}
          {typeof id == "string" ? "Save Changes" : "Add Item"}
        </button>
      </form>
    </Loading>
  );
};

export default AdmissionProcessForm;
