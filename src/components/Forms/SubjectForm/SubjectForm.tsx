import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

import {
  addSubject,
  updateSubject,
} from "../../../redux/slice/subjects/subjectSlice";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";
import UploadImage from "../../common/uploadImage/UploadImage";

type Inputs = {
  name: string;
  image: string;
  description: string;
};

const SubjectForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { records, isLoading, error } = useAppSelector(
    (state) => state.subjectSlice
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = records.find((item) => item._id === id);
      if (record) {
        setName(record.name);
        setDescription(record.description);
      }
    }
  }, [id, isUpdateMode, records]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name,
      description,
    },
  });

  useEffect(() => {
    reset({ name, description });
  }, [name, description, reset]);

  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("name", data.name);
    form.append("description", data.description);

    const action = isUpdateMode
      ? updateSubject({ id: id, data: form })
      : addSubject(form);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/subjects");
      })
      .catch(() => toast.error("Something went wrong, please try again"));
  };

  return (
    <Loading status={isLoading} error={error} variant="form" hasData>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            type="text"
            placeholder="Enter Name"
            {...register("name", { required: "The Name is Required" })}
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
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

        <UploadImage form={form} type="image" records={records}/>
        <button type="submit" className="submit-button" disabled={isLoading === "Pending"}>
          {isLoading === "Pending" && <span className="btn-spinner" />}
          {typeof id == "string" ? "Save Changes" : "Add Item"}
        </button>
      </form>
    </Loading>
  );
};

export default SubjectForm;
