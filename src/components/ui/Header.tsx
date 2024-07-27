import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FaDoorOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Header = () => {
  let [cartSize, setCartSize] = useState(0);

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
        <div className="flex justify-center items-center">
          <a className="flex justify-center items-center" href="#">
            <img
              className="w-8"
              src="https://www.svgrepo.com/show/529450/cart-large-2.svg"
              alt="cart-icon"
            />
            <b className="text-slate-900 text-lg">{cartSize}</b>
          </a>
        </div>
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
            <DropdownMenuItem className="flex justify-center items-center"></DropdownMenuItem>
            <DropdownMenuItem className="flex justify-center items-center">
              <Link to="/login">
                <Button>
                  {" "}
                  <FaDoorOpen className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-center items-center">
              <Link to="/register">
                <Button variant={"outline"}>
                  {" "}
                  <FaUser className="mr-2 h-4 w-4" /> Register
                </Button>
              </Link>
            </DropdownMenuItem>
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
        <div className="flex justify-center items-center">
          <a className="flex justify-center items-center" href="#">
            <img
              className="w-8"
              src="https://www.svgrepo.com/show/529450/cart-large-2.svg"
              alt="cart-icon"
            />
            <b className="text-slate-900 text-lg">{cartSize}</b>
          </a>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <Link to="/login">
            <Button>
              {" "}
              <FaDoorOpen className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant={"outline"}>
              {" "}
              <FaUser className="mr-2 h-4 w-4" /> Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
