import React from "react";

type TProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

const PageHeader: React.FC<TProps> = ({ title, subtitle, action }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
    <div>
      <h1 className="text-[22px] md:text-[26px] font-[800] text-dimBlack leading-tight">{title}</h1>
      {subtitle && <p className="text-[14px] text-Grey_40 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
