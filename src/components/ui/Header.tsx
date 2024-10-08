import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaDoorOpen, FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between py-6 px-8 border-b-[1px] border-[#333] 2xl:py-8 2xl:px-12">
      <div>
        <a
          className="font-bold text-xl 2xl:text-2xl cursor-pointer text-slate-900"
          href="/"
        >
          MANGAFY.GE
        </a>
      </div>

      <div className="flex justify-center items-center space-x-4 lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              className="w-8"
              src="https://www.svgrepo.com/show/506800/burger-menu.svg"
              alt="burger-menu"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex justify-center items-center">
              Navigation Links
            </DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl"
                    : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl"
                }
                to="/"
              >
                Home
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl"
                    : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl"
                }
                to="/catalog"
              >
                Catalog
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl"
                    : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl"
                }
                to="/about"
              >
                About
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex justify-center items-center">
              Account
            </DropdownMenuLabel>
            {token ? (
              <div>
                <DropdownMenuItem className="flex justify-center items-center">
                  <Link to="/profile">
                    <Button>
                      <FaDoorOpen className="mr-2 h-4 w-4" /> Profile
                    </Button>
                  </Link>
                </DropdownMenuItem>
                {token && (
                  <DropdownMenuItem className="flex justify-center items-center">
                    <Link to="/cart">
                      <Button>
                        <FaShoppingCart className="mr-2" />
                        Check Cart
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="flex justify-center items-center">
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <FaUser className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem className="flex justify-center items-center">
                  <Link to="/login">
                    <Button>
                      <FaDoorOpen className="mr-2 h-4 w-4" /> Login
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center items-center">
                  <Link to="/register">
                    <Button variant={"outline"}>
                      <FaUser className="mr-2 h-4 w-4" /> Register
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden lg:flex space-x-16">
        <ul className="flex space-x-8">
          <li className="flex justify-center items-center">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl"
                  : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="flex justify-center items-center">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl"
                  : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl"
              }
              to="/catalog"
            >
              Catalog
            </NavLink>
          </li>
          <li className="flex justify-center items-center">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl"
                  : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl"
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
        {token && (
          <div className="flex justify-center items-center">
            <Link to="/cart">
              <Button>
                <FaShoppingCart className="mr-2" />
                Check Cart
              </Button>
            </Link>
          </div>
        )}
        {token ? (
          <div className="flex justify-center items-center space-x-2">
            <Link to="/profile">
              <Button>
                <FaDoorOpen className="mr-2 h-4 w-4" /> Profile
              </Button>
            </Link>
            <Button
              variant={"outline"}
              onClick={() => {
                signOut();
              }}
            >
              <FaUser className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <Link to="/login">
              <Button>
                <FaDoorOpen className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant={"outline"}>
                <FaUser className="mr-2 h-4 w-4" /> Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
