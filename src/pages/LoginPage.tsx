import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";


const LoginPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://mangafy-api.onrender.com/users/api/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      login(data.token);
    } catch (err) {
      console.log("Error fetching user credentials: ", err);
    } finally {
      navigate("/");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center my-8 lg:my-20">
      <span className="text-slate-900 text-2xl">Login</span>
      <form className="flex flex-col justify-center items-center space-y-4 mt-4" onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input type="password" placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        />
        <Link to="/register" className="text-sm underline">
        Don't have an account? Create here
        </Link>
        <Button>Sign In</Button>
      </form>
    </div>
  );
};

export default LoginPage;
