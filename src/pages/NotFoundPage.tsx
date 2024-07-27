import { Button } from "@/components/ui/button";
import notFound from "../assets/notfound.jpg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-2">
      <span className="text-3xl font-bold text-slate-900">Error 404</span>
      <span className="text-3xl text-slate-900">Page Not Found...</span>
      {/* <img className="w-[30rem]" src={notFound} alt="404" /> */}
      <Link to="/">
        <Button> <FaArrowLeft className="mr-2 h-4 w-4" /> Back to home page</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
