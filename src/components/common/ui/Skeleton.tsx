import React from "react";

export const Bone: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`skeleton block rounded-md ${className}`} aria-hidden="true" />
);

const shell = "bg-white border-2 border-Grey_15/15 rounded-xl";

export const CardSkeleton: React.FC = () => (
  <div className={`${shell} p-6`}>
    <div className="flex items-start justify-between gap-4">
      <Bone className="w-14 h-14 !rounded-lg" />
      <div className="flex gap-2">
        <Bone className="w-9 h-9 !rounded-lg" />
        <Bone className="w-9 h-9 !rounded-lg" />
      </div>
    </div>
    <Bone className="h-5 w-1/2 mt-6" />
    <Bone className="h-3.5 w-full mt-4" />
    <Bone className="h-3.5 w-11/12 mt-2" />
    <Bone className="h-3.5 w-3/5 mt-2" />
  </div>
);

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 6,
  cols = 4,
}) => (
  <div className={`${shell} overflow-hidden`}>
    <div className="bg-Orange_95/60 px-5 py-4 grid gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
      {Array.from({ length: cols }).map((_, c) => (
        <Bone key={c} className="h-3.5 w-2/3" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div
        key={r}
        className="px-5 py-4 grid gap-6 border-t border-Grey_15/10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
      >
        {Array.from({ length: cols }).map((_, c) => (
          <Bone key={c} className={`h-4 ${c === cols - 1 ? "w-24" : "w-full"}`} />
        ))}
      </div>
    ))}
  </div>
);

export const FormSkeleton: React.FC = () => (
  <div className={`${shell} p-6 md:p-8 max-w-4xl`}>
    <div className="grid md:grid-cols-2 gap-5">
      {[0, 1].map((i) => (
        <div key={i}>
          <Bone className="h-3.5 w-24" />
          <Bone className="h-11 w-full mt-2.5 !rounded-lg" />
        </div>
      ))}
    </div>
    <Bone className="h-3.5 w-28 mt-6" />
    <Bone className="h-28 w-full mt-2.5 !rounded-lg" />
    <Bone className="h-40 w-56 mt-6 mx-auto !rounded-lg" />
    <Bone className="h-11 w-full mt-6 !rounded-lg" />
  </div>
);

export type SkeletonVariant = "grid" | "table" | "form";

export const SkeletonFor: React.FC<{ variant?: SkeletonVariant }> = ({ variant = "grid" }) =>
  variant === "table" ? <TableSkeleton /> : variant === "form" ? <FormSkeleton /> : <GridSkeleton />;
