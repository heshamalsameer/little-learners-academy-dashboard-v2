import { useNavigate } from "react-router-dom";
import styles from "../../components/dashboardNav/header.module.css";
import TestimonialForm from "../../components/Forms/TestimonialForm/TestimonialForm";

const NewTestimonial: React.FC = () => {
  const navigate = useNavigate();
  const clickedHandler = () => {
    navigate(-1);
  };
  return (
    <div className="p-11">
      <button className={`${styles.btn} mb-4`} onClick={clickedHandler}>
        BACK
      </button>
      <TestimonialForm />
    </div>
  );
};

export default NewTestimonial;
