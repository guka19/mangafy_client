import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Manga from "@/interfaces/Manga";
import { Button } from "@/components/ui/button";
import { FaCartPlus, FaDollarSign } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "react-toastify";

const MangaPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`https://mangafy-api.onrender.com/mangas/api/${id}`);
        const data: Manga = await res.json();
        setManga(data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [id]);

  const buyNow = () => {
    if (!token) {
      toast.error("Login first to use cart");
      navigate("/login");
      return;
    } else {
      navigate(`/checkout/${manga?.price}`)
    }
  }

  const addToCart = async () => {
    if (!token) {
      toast.error("Login first to use cart");
      navigate("/login");
      return;
    }
    setIsAdding(true);

    try {
      const response = await fetch("https://mangafy-api.onrender.com/carts/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mangaId: manga?._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      await response.json();
      toast.success("Manga added to cart successfully!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Manga not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/" className="text-slate-900 font-semibold">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/catalog" className="text-slate-900 font-semibold">Manga Catalog</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={`/mangas/${manga._id}`} className="text-slate-900 font-semibold">{manga.title} Volume {manga.volume}</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row mt-6">
        <div className="md:w-1/3">
          <img
            src={manga.imageUrl}
            alt={manga.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3 flex flex-col">
          <h1 className="text-3xl font-bold mb-2">
            {manga.title}, Volume {manga.volume}
          </h1>
          <h2 className="text-xl text-gray-700 mb-4">by {manga.author}</h2>
          <p className="text-gray-800 mb-4">{manga.description}</p>
          <div className="flex flex-wrap items-center mb-4">
            <span className="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              Volume {manga.volume}
            </span>
            <span className="bg-green-200 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              Rating: {manga.rating}
            </span>
            <span className="bg-yellow-200 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              ${manga.price.toFixed(2)}
            </span>
            <span className="bg-red-200 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              {manga.category.toUpperCase()}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Genres:</h3>
            <ul className="list-disc list-inside">
              {manga.genres.map((genre, index) => (
                <li key={index} className="text-gray-600">
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-gray-600">
            Published on: {new Date(manga.publishedDate).toLocaleDateString()}
          </div>
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Button  className="flex-1 text-center" onClick={buyNow}>
                <FaDollarSign className="mr-2 h-4 w-4" /> Buy Now
              </Button>
            <Button
              className={isAdding ? "bg-gray-300 flex-1 text-center" : "bg-blue-500 hover:bg-blue-700 flex-1 text-center"}
              onClick={addToCart}
              disabled={isAdding}
            >
              <FaCartPlus className="mr-2 h-4 w-4" />
              {isAdding ? "Adding..." : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaPage;
