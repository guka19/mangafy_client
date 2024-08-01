import React, { useState } from "react";
import Manga from "@/interfaces/Manga";
import { Button } from "./button";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface MangaCardProps {
  manga: Manga;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const addToCart = async () => {
    if (!token) {
      toast.error("Login first to use cart");
      navigate("/login");
      return 0;
    }
    setIsAdding(true);

    try {
      const response = await fetch("https://mangafy-api.onrender.com/carts/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          mangaId: manga._id,
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

  return (
    <div className="m-4 max-w-[300px] border border-gray-300 shadow-lg p-4 rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-center mb-4">
        <img
          className="w-[250px] h-[400px] object-cover rounded-lg"
          src={manga.imageUrl}
          alt="manga-cover"
        />
      </div>
      <div className="flex flex-col text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-800">
          {manga.title} Volume {manga.volume}
        </h2>
        <span className="text-sm text-gray-600">By: {manga.author}</span>
        <b className="text-lg text-slate-900">{manga.price}$</b>
        <p className="text-sm text-gray-700 mb-2">
          {showFullDescription
            ? manga.description
            : `${manga.description.substring(0, 120)}...`}
        </p>
        <button
          onClick={toggleDescription}
          className="text-blue-500 hover:underline text-sm font-medium cursor-pointer"
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
      </div>
      <div className="flex justify-center items-center space-x-4 mt-6">
        <Button
          onClick={addToCart}
          disabled={isAdding}
          className={isAdding ? "bg-gray-300" : "bg-blue-500"}
        >
          <FaCartPlus className="mr-2 h-4 w-4" />
          {isAdding ? "Adding..." : "Add to cart"}
        </Button>
        <Link to={`/mangas/${manga._id}`}>
          <Button variant={"outline"}>Full Review</Button>
        </Link>
      </div>
    </div>
  );
};

export default MangaCard;
