import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Spinner from "@/components/ui/Spinner";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://mangafy-api.onrender.com/users/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token);
      navigate("/");
    } catch (err: any) {
      if ((err.message = "user_not_found")) {
        console.log("Error fetching user credentials: ", err);
        toast.error(
          "Either email or password is incorrect"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-8 lg:my-20">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <span className="text-slate-900 text-2xl">Login</span>
          <form
            className="flex flex-col justify-center items-center space-y-4 mt-4"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/register" className="text-sm underline">
              Don't have an account? Create one here
            </Link>
            <Button type="submit">Sign In</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
