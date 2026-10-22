import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import CardActions from "../common/ui/CardActions";
import { ui } from "../common/ui/ui";

type TProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  to: string;
  deleteAction: any;
};

const SubjectCard = ({ id, name, description, image, to, deleteAction }: TProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${ui.card} overflow-hidden h-full flex flex-col`}>
      <div className="relative bg-Orange_97 border-b-2 border-Grey_15 h-48 flex items-center justify-center">
        {image ? (
          <img src={image} className="w-full h-full object-contain p-3" alt={name} loading="lazy" />
        ) : (
          <span className="text-Grey_60 text-[14px]">No image</span>
        )}
        <CardActions
          className="absolute top-3 right-3"
          onEdit={() => navigate(`/${to}/update/${id}`)}
          onDelete={() => dispatch(deleteAction(id)).unwrap()}
        />
      </div>
      <div className="p-5 text-center">
        <h3 className={ui.cardTitle}>{name}</h3>
        <p className={`${ui.cardText} mt-2`}>{description}</p>
      </div>
    </div>
  );
};

export default SubjectCard;
