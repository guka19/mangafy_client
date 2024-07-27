import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import MangaCard from "@/components/ui/MangaCard";
import Manga from "@/interfaces/Manga";

const CatalogPage = () => {

  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await fetch("http://localhost:3000/mangas/api/getAll");
        const data = await res.json();
        setMangas(data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMangas();
  }, [])

  return (
    <div className='flex flex-col justify-center items-center py-4 px-16'>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 xl:space-x-16 mb-4 w-full max-w-6xl">
        <div className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search for mangas..."
            className="outline-none p-2 text-md border border-slate-300 rounded-l-xl md:p-3 xl:pr-12 xl:text-lg 2xl:pr-24 w-full md:w-auto"
          />
          <button className="bg-slate-900 rounded-r-xl p-2 md:p-3">
            <FaSearch className="text-white" />
          </button>
        </div>
        <div className="hidden lg:flex space-x-6">
          <select
            name="category"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease text-lg p-2"
          >
            <option value="" hidden>
              Category
            </option>
            <option value="shonen">Shonen</option>
            <option value="josei">Josei</option>
            <option value="shojo">Shojo</option>
            <option value="seinen">Seinen</option>
          </select>
          <select
            name="dateReleased"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease text-lg p-2"
          >
            <option value="" hidden>
              Release Date
            </option>
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
          <select
            name="Rating"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease text-lg p-2"
          >
            <option value="" hidden>
              Rating
            </option>
            <option value="4-5">4-5</option>
            <option value="3-4">3-4</option>
            <option value="2-4">2-3</option>
            <option value="1-2">1-2</option>
            <option value="0-1">0-1</option>
          </select>
          <select
            name="genre"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease text-lg p-2"
          >
            <option value="" hidden>
              Main Genre
            </option>
            <option value="adventure">Adventure</option>
            <option value="fantasy">Fantasy</option>
            <option value="action">Action</option>
            <option value="historical">Historical</option>
            <option value="dark fantasy">Supernatural</option>
          </select>
          <Button>Apply Filters</Button>
        </div>
        <div
          className="flex items-center bg-slate-900 rounded-xl p-2 text-white lg:hidden cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span>Filter</span>
          {showFilter ? (
            <RiArrowUpSLine className="ml-2" />
          ) : (
            <RiArrowDownSLine className="ml-2" />
          )}
        </div>
      </div>
      {showFilter ? (
        <div className="flex flex-col mt-1 py-2 space-y-2 border-b border-slate-300 lg:hidden w-full max-w-6xl">
          <select
            name="category"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease p-2"
          >
            <option value="" hidden>
              Category
            </option>
            <option value="shonen">Shonen</option>
            <option value="josei">Josei</option>
            <option value="shojo">Shojo</option>
            <option value="seinen">Seinen</option>
          </select>
          <select
            name="dateReleased"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease p-2"
          >
            <option value="" hidden>
              Release Date
            </option>
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
          <select
            name="Rating"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease p-2"
          >
            <option value="" hidden>
              Rating
            </option>
            <option value="4-5">4-5</option>
            <option value="3-4">3-4</option>
            <option value="2-4">2-3</option>
            <option value="1-2">1-2</option>
            <option value="0-1">0-1</option>
          </select>
          <select
            name="genre"
            className="border border-slate-300 rounded-xl outline-none cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-150 ease p-2"
          >
            <option value="" hidden>
              Main Genre
            </option>
            <option value="adventure">Adventure</option>
            <option value="fantasy">Fantasy</option>
            <option value="action">Action</option>
            <option value="historical">Historical</option>
            <option value="dark fantasy">Supernatural</option>
          </select>
          <Button>Apply Filters</Button>
        </div>
      ) : null}
      <span className="text-3xl font-bold text-gray-800 mb-6">Manga Catalog</span>
        <div className="flex flex-wrap justify-center items-center w-full px-16">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            mangas.map((manga) => (
              <MangaCard manga={manga} key={manga._id} />
            ))
          )}
        </div>
    </div>
  )
}

export default CatalogPage