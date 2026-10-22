import Lottie from "lottie-react";
import notfound from "../../services/notfound.json";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-Orange_97 flex justify-center items-center flex-col text-center px-4">
      <Lottie animationData={notfound} style={{ width: 360, maxWidth: "100%" }} />
      <h1 className="text-[24px] md:text-[28px] font-[800] text-dimBlack">Page not found</h1>
      <p className="text-[15px] text-Grey_40 mt-1">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        replace
        className="mt-6 inline-flex items-center h-11 px-6 rounded-lg bg-primary text-white text-[15px] font-[700] border-2 border-Grey_15 shadow-[3px_3px_0_#262626] hover:shadow-[1px_1px_0_#262626] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
