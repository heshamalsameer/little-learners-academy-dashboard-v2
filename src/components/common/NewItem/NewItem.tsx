import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { ui } from "../ui/ui";
import { titleFor } from "../../../constants/labels";

type TProps = {
  children: React.ReactNode;
};

const NewItem: React.FC<TProps> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [section, mode] = pathname.split("/").filter(Boolean);
  const isUpdate = mode === "update";

  return (
    <div className="page">
      <div className="flex flex-wrap items-center gap-4 mb-7">
        <button className={`${ui.btn} ${ui.secondary}`} onClick={() => navigate(-1)}>
          <RiArrowLeftLine size={18} /> Back
        </button>
        <div>
          <h1 className="text-[22px] md:text-[26px] font-[800] text-dimBlack leading-tight">
            {isUpdate ? "Edit" : "Add"} {titleFor(section ?? "")}
          </h1>
        </div>
      </div>
      <div className={`${ui.card} p-5 md:p-8 max-w-4xl`}>{children}</div>
    </div>
  );
};

export default NewItem;
