import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/store";
import { createFAQ, editFAQ, fetchFAQs } from "../../redux/faq/faqAct";
import FormShell, { FormActions } from "../../components/common/ui/FormShell";

const AddEditFaq = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { faqs } = useSelector((state: RootState) => state.faqs);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (faqs.length === 0) dispatch(fetchFAQs());
  }, [dispatch, faqs.length]);

  useEffect(() => {
    if (!id) return;
    const existing = faqs.find((faq) => faq._id === id);
    if (existing) {
      setQuestion(existing.question);
      setAnswer(existing.answer);
    }
  }, [id, faqs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (id) await dispatch(editFAQ({ id, faq: { question, answer } })).unwrap();
      else await dispatch(createFAQ({ question, answer })).unwrap();
      toast.success(id ? "FAQ updated" : "FAQ added");
      navigate("/faq");
    } catch {
      toast.error("Something went wrong, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormShell title={id ? "Edit FAQ" : "Add FAQ"}>
      <form onSubmit={handleSubmit} className="student-form-form">
        <div className="form-group full-width">
          <label htmlFor="question">Question</label>
          <input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        <div className="form-group full-width">
          <label htmlFor="answer">Answer</label>
          <textarea id="answer" rows={5} value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </div>
        <FormActions busy={busy} isEdit={!!id} onCancel={() => navigate("/faq")} />
      </form>
    </FormShell>
  );
};

export default AddEditFaq;
