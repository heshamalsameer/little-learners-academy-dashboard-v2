import { NavLink, useLocation } from "react-router-dom";
import { DashBoardLinks } from "../../constants/index";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const current = pathname.split("/").filter(Boolean)[0]?.toLowerCase() ?? "benefits";

  const aliases: Record<string, string> = {
    "add-benefit": "benefits",
    "edit-benefit": "benefits",
    "add-edit-history": "history",
    "special-features": "specialfeatures",
    "add-edit-special-feature": "specialfeatures",
    "add-faq": "faq",
    "fee-structure": "feestructures",
    "add-fee-structure": "feestructures",
    "edit-fee-structure": "feestructures",
  };
  const active = aliases[current] ?? current;

  return (
    <nav className="p-4">
      <p className="px-3 mb-3 text-[12px] font-[700] uppercase tracking-wider text-white/80">Content</p>
      <ul className="flex flex-col gap-1">
        {DashBoardLinks.map((item) => {
          const key = item.path.replace(/^\//, "").toLowerCase();
          const isActive = key === active;
          return (
            <li key={item.path}>
              <NavLink
                to={`/${item.path.replace(/^\//, "")}`}
                className={`flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] font-[600] border-2 transition-colors ${
                  isActive
                    ? "bg-white text-Grey_15 border-Grey_15 shadow-[3px_3px_0_#262626]"
                    : "text-white border-transparent hover:bg-white/15"
                }`}
              >
                <span className="text-[17px] shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
