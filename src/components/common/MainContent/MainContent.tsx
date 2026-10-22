import { useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import Loading from "../Loading/Loading";
import PageHeader from "../ui/PageHeader";
import { ui } from "../ui/ui";
import { SkeletonVariant } from "../ui/Skeleton";
import { titleFor } from "../../../constants/labels";

type TProps = {
  status: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
  children: React.ReactNode;
  to: string;
  title?: string;
  count?: number;
  variant?: SkeletonVariant;
};

const MainContent = ({ status, error, children, to, title, count = 0, variant }: TProps) => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <PageHeader
        title={title ?? titleFor(to)}
        subtitle={status === "Success" || count ? `${count} item${count === 1 ? "" : "s"}` : undefined}
        action={
          <button className={`${ui.btn} ${ui.primary}`} onClick={() => navigate(`/${to}/add`)}>
            <RiAddLine size={18} /> Add New
          </button>
        }
      />
      <Loading status={status} error={error} hasData={count > 0} variant={variant}>
        {children}
      </Loading>
    </div>
  );
};

export default MainContent;
