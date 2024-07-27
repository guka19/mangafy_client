import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginPage = () => {

  return (
    <div className="flex flex-col justify-center items-center my-8 lg:my-20">
      <span className="text-slate-900 text-2xl">Login</span>
      <form className="flex flex-col justify-center items-center space-y-4 mt-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Link to="/register" className="text-sm underline">
        Don't have an account? Create here
        </Link>
        <Button>Sign In</Button>
      </form>
    </div>
  );
};

export default LoginPage;
