import { useState } from "react";
import search from "../assets/search.svg";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const HomePage = () => {

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center py-4">
      <div className="flex items-center space-x-4">
        <div className="flex">
          <input type="text" placeholder="Search for mangas..." className="outline-none p-2 text-md border-[1px] border-slate-900 rounded-xl"/>
          <img src={search} alt="search-icon" className="w-10"/>
        </div>
        <div className="flex items-center bg-slate-900 rounded-xl p-2 text-white" onClick={() => {
          setShowFilter(!showFilter);
        }}>
          <span>Filter</span>
          { showFilter ? <RiArrowUpSLine/> : <RiArrowDownSLine /> }
        </div>
      </div>
      { showFilter ? 
      <div className="flex flex-col mt-1 py-2 space-y-2 border-b-[1px] border-[#333]">
      <select name="category" className="border-none rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease">
          <option value="" disabled selected hidden>Category</option>
          <option value="shonen">Shonen</option>
          <option value="josei">Josei</option>
          <option value="shojo">Shojo</option>
          <option value="seinen">Seinen</option>
        </select>
        <select name="dateReleased" className="border-none rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease">
          <option value="" disabled selected hidden>Relese Date</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>  
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </select>
        <select name="Rating" className="border-none rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease">
          <option value="" disabled selected hidden>Rating</option>
          <option value="4-5">4-5</option>
          <option value="3-4">3-4</option>
          <option value="2-4">2-3</option>
          <option value="1-2">1-2</option>
          <option value="0-1">0-1</option>
        </select>
        <select name="genre" className="border-none rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease">
          <option value="" disabled selected hidden>Main Genre</option>
          <option value="adventure">Adventure</option>
          <option value="fantasy">Fantasy</option>
          <option value="action">Action</option>
          <option value="historical">Historical</option>
          <option value="dark fantasy">Supernatural</option>
        </select>
        <Button>Apply Filters</Button>
      </div> : null }
    </div>
  );
};

export default HomePage;
