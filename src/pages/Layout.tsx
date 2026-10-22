import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import DashboardSidebar from "../components/dashboardSidebar/DashboardSidebar";

const DashBoardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    document.getElementById("dashboard-main")?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="h-screen flex flex-col bg-Orange_97">
      <DashboardNav onMenu={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { border: "2px solid #262626", borderRadius: 10, fontSize: 14, fontWeight: 600 },
        }}
      />
      <div className="flex flex-1 min-h-0">
        <div
          onClick={() => setMenuOpen(false)}
          className={`lg:hidden fixed inset-0 top-16 bg-Grey_15/40 z-30 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
        <aside
          className={`fixed lg:static top-16 bottom-0 left-0 z-40 w-64 shrink-0 bg-primary border-r-2 border-Grey_15 overflow-y-auto transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <DashboardSidebar />
        </aside>
        <main id="dashboard-main" className="flex-1 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
