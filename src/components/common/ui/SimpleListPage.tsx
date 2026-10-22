import React from "react";
import { useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import Loading from "../Loading/Loading";
import PageHeader from "./PageHeader";
import { ui } from "./ui";
import { SkeletonVariant } from "./Skeleton";
import { EmptyState } from "../GridList/GridList";

type TProps = {
  title: string;
  addPath: string;
  loading: boolean;
  error: string | null;
  count: number;
  variant?: SkeletonVariant;
  children: React.ReactNode;
};

const SimpleListPage: React.FC<TProps> = ({ title, addPath, loading, error, count, variant, children }) => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <PageHeader
        title={title}
        subtitle={loading && !count ? undefined : `${count} item${count === 1 ? "" : "s"}`}
        action={
          <button className={`${ui.btn} ${ui.primary}`} onClick={() => navigate(addPath)}>
            <RiAddLine size={18} /> Add New
          </button>
        }
      />
      <Loading
        status={loading ? "Pending" : error ? "Fail" : "Success"}
        error={error}
        variant={variant}
        hasData={count > 0}
      >
        {count === 0 ? <EmptyState /> : children}
      </Loading>
    </div>
  );
};

export const mediaUrl = (value: unknown): string | undefined =>
  typeof value === "string" ? value : (value as { url?: string } | undefined)?.url;

export default SimpleListPage;
