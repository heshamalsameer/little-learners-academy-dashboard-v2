import React from "react";
import Lottie from "lottie-react";
import notfound from "./not found.json";

type TGridListProps<T> = {
  records: T[];
  renderItems: (record: T) => React.ReactNode;
  grid: boolean;
};

export const EmptyState = ({ message = "No items yet. Start by adding a new one." }: { message?: string }) => (
  <div className="flex flex-col items-center text-center py-6">
    <Lottie animationData={notfound} style={{ width: 280, maxWidth: "100%" }} />
    <p className="text-[15px] text-Grey_40 mt-2">{message}</p>
  </div>
);

const GridList = <T,>({ records, renderItems, grid }: TGridListProps<T>) => {
  if (!records?.length) return <EmptyState />;
  return (
    <div className={grid ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch" : "flex flex-col gap-6"}>
      {records.map((record, index) => (
        <div key={(record as any)?._id ?? index} className="h-full">
          {renderItems(record)}
        </div>
      ))}
    </div>
  );
};

export default GridList;
