import { Button } from "@/components/ui/button";
import notFound from "../assets/404.svg";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-2">
      <span className="text-3xl font-bold text-slate-900">Error 404</span>
      <span className="text-3xl text-slate-900">Page Not Found...</span>
      <img className="w-[18rem]" src={notFound} alt="404" />
      <Link to="/">
        <Button>Back to home page</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
