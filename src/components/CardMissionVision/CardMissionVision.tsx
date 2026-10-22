import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { deleteMissionVision } from "../../redux/slice/mission-vision/missionVisionSlice";
import CardActions from "../common/ui/CardActions";
import { ui } from "../common/ui/ui";

type TPropsCard = {
  id: string;
  title: string;
  description: string;
};

const CardMissionVision: React.FC<TPropsCard> = ({ title, description }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${ui.card} p-6 h-full flex flex-col`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[24px] md:text-[28px] font-[800] text-dimBlack">{title}</h3>
        <CardActions
          onEdit={() => navigate(`/mission-vision/update/${title}`)}
          onDelete={() => dispatch(deleteMissionVision(title)).unwrap()}
        />
      </div>
      <p className={`${ui.cardText} mt-4`}>{description}</p>
    </div>
  );
};

export default CardMissionVision;
