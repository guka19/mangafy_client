import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import MangaCard from "@/components/ui/MangaCard";
import Manga from "@/interfaces/Manga";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CatalogPage = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await fetch("https://mangafy-api.onrender.com/mangas/api/getAll");
        const data = await res.json();
        setMangas(data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  const searchMangas = async () => {
    setLoading(true);
    try {
      const url = new URL("https://mangafy-api.onrender.com/mangas/api/search");
      url.searchParams.append('title', searchQuery);

      // Add other filters if they are set
      if (selectedCategory) url.searchParams.append('category', selectedCategory);
      if (selectedPrice) url.searchParams.append('price', selectedPrice);

      const res = await fetch(url);
      const data = await res.json();
      setMangas(data);
    } catch (err) {
      console.log("Error fetching data: ", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedPrice("");
    setLoading(true);
    fetch("https://mangafy-api.onrender.com/mangas/api/getAll")
      .then((res) => res.json())
      .then((data) => {
        setMangas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 px-16">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 xl:space-x-16 mb-4 w-full max-w-6xl">
        <div className="flex justify-center items-center space-x-2 border-[1px] border-slate-900 p-1 rounded-xl">
          <Input
            placeholder="Search for the mangas..."
            className="border-none focus-visible:ring-white text-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={searchMangas}>
            <FaSearch className="mr-2 w-4 h-4" /> Search
          </Button>
        </div>
        <div className="hidden lg:flex space-x-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shonen">Category: Shonen</SelectItem>
              <SelectItem value="shojo">Category: Shoho</SelectItem>
              <SelectItem value="seinen">Category: Seinen</SelectItem>
              <SelectItem value="josei">Category: Josei</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={searchMangas}>Apply Filters</Button>
          <Button variant="secondary" onClick={resetFilters}>Reset Filters</Button>
        </div>
        <div
          className="flex items-center bg-slate-900 rounded-xl p-2 text-white lg:hidden cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span>Filter</span>
          {showFilter ? <RiArrowUpSLine className="ml-2" /> : <RiArrowDownSLine className="ml-2" />}
        </div>
      </div>
      {showFilter ? (
        <div className="flex flex-col justify-center items-center mt-1 py-2 space-y-2 border-b border-slate-300 lg:hidden w-full max-w-6xl">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shonen">Category: Shonen</SelectItem>
              <SelectItem value="shojo">Category: Shoho</SelectItem>
              <SelectItem value="seinen">Category: Seinen</SelectItem>
              <SelectItem value="josei">Category: Josei</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={searchMangas}>Apply Filters</Button>
        </div>
      ) : null}
      <span className="text-3xl font-bold text-gray-800 mb-6">Manga Catalog</span>
      <div className="flex flex-wrap justify-center items-center w-full px-16">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          mangas.map((manga) => <MangaCard manga={manga} key={manga._id} />)
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
