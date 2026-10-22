import { useNavigate } from "react-router-dom";
import styles from "../../components/dashboardNav/header.module.css";
import MissionVisionForm from "../../components/Forms/MissionVisionForm/MissionVisionForm";

const NewMissionVision: React.FC = () => {
  const navigate = useNavigate();
  const clickedHandler = () => {
    navigate(-1);
  };
  return (
    <div className="p-11">
      <button className={`${styles.btn} mb-4`} onClick={clickedHandler}>
        BACK
      </button>
      <MissionVisionForm />
    </div>
  );
};

export default NewMissionVision;
