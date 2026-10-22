import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { ui } from "../common/ui/ui";

type TProps = {
  onMenu: () => void;
  menuOpen: boolean;
};

const DashboardNav = ({ onMenu, menuOpen }: TProps) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 shrink-0 flex items-center justify-between gap-4 px-4 md:px-6 bg-white border-b-2 border-Grey_15 relative z-50">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={onMenu}
          className={`${ui.iconBtn} lg:hidden bg-Orange_95 border-Grey_15 text-Grey_15`}
        >
          {menuOpen ? <IoMdClose /> : <AiOutlineMenu />}
        </button>
        <Link to="/benefits" className="flex items-center gap-3">
          <span className="bg-primary border-2 border-Grey_15 rounded-lg px-3 py-1.5">
            <img src="/assets/Logo.png" className="h-6 w-auto" alt="Little Learners" />
          </span>
          <span className="hidden sm:block text-[15px] font-[700] text-Grey_15">Dashboard</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-Orange_90 border-2 border-Grey_15 flex items-center justify-center text-[14px] font-[800] uppercase">
            {name[0]}
          </span>
          <span className="text-[14px] font-[600] capitalize max-w-[160px] truncate">{name}</span>
        </div>
        <button onClick={logout} className={`${ui.btn} ${ui.secondary}`}>
          <RiLogoutBoxRLine size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardNav;
