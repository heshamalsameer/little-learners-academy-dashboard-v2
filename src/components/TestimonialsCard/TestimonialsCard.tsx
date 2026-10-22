import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTestimonial } from "../../redux/slice/testimonials/testimonialSlice";
import CardActions from "../common/ui/CardActions";
import { ui } from "../common/ui/ui";

interface TestimonialsCardProps {
  image?: string;
  name?: string;
  evaluation: number | string;
  description?: string;
  id?: string;
}

const renderStars = (evaluation: number) => {
  const value = Math.max(0, Math.min(5, evaluation || 0));
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} size={16} color="#FF8D4C" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt size={16} color="#FF8D4C" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} size={16} color="#FF8D4C" />
      ))}
    </div>
  );
};

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ image, description, name, evaluation, id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${ui.card} p-6 h-full flex flex-col`}>
      <CardActions
        className="self-end"
        onEdit={() => navigate(`/testimonials/update/${id}`)}
        onDelete={() => dispatch(deleteTestimonial(id as string)).unwrap()}
      />
      <div className="text-center -mt-3">
        <img
          src={image || "/assets/images/Vector.png"}
          alt={name}
          className="w-16 h-16 object-cover rounded-full mx-auto mb-3 bg-Orange_97 border-2 border-Grey_15"
          loading="lazy"
        />
        <h3 className={ui.cardTitle}>{name}</h3>
      </div>
      <div className="py-3">{renderStars(Number(evaluation))}</div>
      <p className={`${ui.cardText} text-center`}>{description}</p>
    </div>
  );
};

export default TestimonialsCard;
