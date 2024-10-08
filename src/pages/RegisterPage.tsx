import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registerUser = async (e: MouseEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !repeatPassword ||
      !country ||
      !city ||
      !streetAddress
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://mangafy-api.onrender.com/users/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            address: {
              country,
              city,
              streetAddress,
            },
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if ((result.message = "user_already_exists")) {
          toast.error("User with this email already exists!");
          return;
        }
      }

      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      console.log("Error registering user: ", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  const countries = [
    { value: "united states", countryName: "United States" },
    { value: "canada", countryName: "Canada" },
    { value: "mexico", countryName: "Mexico" },
    { value: "brazil", countryName: "Brazil" },
    { value: "argentina", countryName: "Argentina" },
    { value: "united kingdom", countryName: "United Kingdom" },
    { value: "france", countryName: "France" },
    { value: "germany", countryName: "Germany" },
    { value: "italy", countryName: "Italy" },
    { value: "spain", countryName: "Spain" },
    { value: "china", countryName: "China" },
    { value: "japan", countryName: "Japan" },
    { value: "south korea", countryName: "South Korea" },
    { value: "india", countryName: "India" },
    { value: "australia", countryName: "Australia" },
    { value: "south africa", countryName: "South Africa" },
    { value: "egypt", countryName: "Egypt" },
    { value: "nigeria", countryName: "Nigeria" },
    { value: "georgia", countryName: "Georgia" },
  ];

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <span className="text-slate-900 text-2xl">Register</span>
      <form className="flex flex-col justify-center space-y-4 mt-4">
        <Input
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select value={country} onValueChange={(value) => setCountry(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country, i) => (
              <SelectItem value={country.value} key={i}>
                {country.countryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <Link to="/login" className="text-sm underline">
          Already have an account? Login here
        </Link>
        <Button onClick={(e) => registerUser(e)}>Sign Up</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
