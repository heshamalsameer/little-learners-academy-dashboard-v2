import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { deleteMember } from "../../redux/slice/members/memberSlice";
import CardActions from "../common/ui/CardActions";
import { ui } from "../common/ui/ui";
import { MdOutlineMail } from "react-icons/md";

type TProps = {
  id: string;
  name: string;
  photo: string;
  description: string;
  qualification: string;
  email?: string;
};

const MemberCard: React.FC<TProps> = ({ id, name, photo, description, qualification, email }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${ui.card} p-6 h-full flex flex-col`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={photo || "/assets/images/Vector.png"}
            className="w-16 h-16 shrink-0 object-cover border-2 border-Grey_15 rounded-lg bg-Orange_95"
            alt={name}
            loading="lazy"
          />
          <div className="min-w-0">
            <h3 className={`${ui.cardTitle} truncate`}>{name}</h3>
            {email && (
              <p className="flex items-center gap-1.5 text-[13px] text-Grey_40 truncate">
                <MdOutlineMail className="shrink-0" /> {email}
              </p>
            )}
          </div>
        </div>
        <CardActions
          onEdit={() => navigate(`/team-members/update/${id}`)}
          onDelete={() => dispatch(deleteMember(id)).unwrap()}
        />
      </div>
      <div className="mt-5 bg-Orange_97 border-2 border-Grey_15 rounded-lg p-4 flex-1">
        <p className="text-[15px] font-[700] text-dimBlack">{qualification}</p>
        <p className={`${ui.cardText} mt-1.5`}>{description}</p>
      </div>
    </div>
  );
};

export default MemberCard;
