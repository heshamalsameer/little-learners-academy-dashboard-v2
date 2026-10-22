import React from "react";
import Lottie from "lottie-react";
import Error from "./error.json";
import { SkeletonFor, SkeletonVariant } from "../ui/Skeleton";

type TLoadingProps = {
  status: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
  children: React.ReactNode;
  variant?: SkeletonVariant;
  hasData?: boolean;
};

const Loading = ({ status, error, children, variant = "grid", hasData = false }: TLoadingProps) => {
  if (status === "Pending" && !hasData) {
    return (
      <div aria-busy="true" aria-label="Loading">
        <SkeletonFor variant={variant} />
      </div>
    );
  }
  if (status === "Fail" && !hasData) {
    return (
      <div className="flex justify-center items-center py-10 flex-col text-center">
        <Lottie animationData={Error} style={{ width: 260 }} />
        <h2 className="text-[20px] font-[700] text-dimBlack">Something went wrong</h2>
        {error && <p className="text-[14px] text-red-500 mt-1">{error}</p>}
        <button
          onClick={() => window.location.reload()}
          className="mt-5 inline-flex items-center h-10 px-4 rounded-lg text-[14px] font-[600] bg-white border-2 border-Grey_15 hover:bg-Orange_95"
        >
          Reload page
        </button>
      </div>
    );
  }
  return (
    <div className="relative">
      {status === "Pending" && (
        <div className="absolute -top-4 left-0 right-0 h-1 overflow-hidden rounded-full bg-Orange_95">
          <span className="progress-bar block h-full w-1/3 bg-primary rounded-full" />
        </div>
      )}
      {children}
    </div>
  );
};

export default Loading;
