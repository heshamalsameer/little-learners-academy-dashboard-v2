import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import CardActions from "../common/ui/CardActions";
import { ui } from "../common/ui/ui";

interface IProps {
  id: string;
  name: string;
  description: string;
  image: string;
  to: string;
  handleDelete: any;
}

const ActivityCard: React.FC<IProps> = ({ id, image, name, description, to, handleDelete }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${ui.card} p-6 h-full flex flex-col`}>
      <div className="flex items-start justify-between gap-4">
        <div className="w-14 h-14 shrink-0 bg-Orange_90 border-2 border-Grey_15 rounded-lg flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} className="w-8 h-8 object-contain" alt="" loading="lazy" />
          ) : (
            <span className="text-[20px] font-[800] text-Grey_15">{name?.[0]}</span>
          )}
        </div>
        <CardActions
          onEdit={() => navigate(`/${to}/update/${id}`)}
          onDelete={() => dispatch(handleDelete(id)).unwrap()}
        />
      </div>
      <h3 className={`${ui.cardTitle} mt-5`}>{name}</h3>
      <p className={`${ui.cardText} mt-2`}>{description}</p>
    </div>
  );
};

export default ActivityCard;
