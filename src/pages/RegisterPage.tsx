  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Link } from "react-router-dom";

  const RegisterPage = () => {
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

    return (
      <div className="flex flex-col justify-center items-center my-4">
        <span className="text-slate-900 text-2xl">Register</span>
        <form className="flex flex-col justify-center space-y-4 mt-4">
          <Input type="text" placeholder="Firstname" />
          <Input type="text" placeholder="Lastname" />
          <Input type="email" placeholder="Email" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Country (Optional)" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country, i) => (
                <SelectItem value={country.value} key={i}>
                  {country.countryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="text" placeholder="City (Optional)" />
          <Input type="text" placeholder="Street Address (Optional)" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Repeat Password" />
          <Link to="/login" className="text-sm underline">
            Already have an account? Login here
          </Link>
          <Button>Sign Up</Button>
        </form>
      </div>
    );
  };

  export default RegisterPage;
