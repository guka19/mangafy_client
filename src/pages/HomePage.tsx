import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Manga from "@/interfaces/Manga";
import MangaCard from "@/components/ui/MangaCard";
import Spinner from "@/components/ui/Spinner";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaArrowRight } from "react-icons/fa";
import AutoPlay from "embla-carousel-autoplay";

const HomePage = () => {
  const [recentMangas, setRecentMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  const bigThreeCarousel = [
    {
      id: 1,
      name: "bleach",
      image:
        "https://www.animenewsnetwork.com/hotlink/thumbnails/crop1200x630g70/herald/23810/bleachsmall.jpg",
    },
    {
      id: 2,
      name: "naruto",
      image:
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/07/chapter_234color.jpg",
    },
    {
      id: 3,
      name: "one-piece",
      image:
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/01/one-piece-january-2024-manga.jpeg",
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = "https://mangafy-api.onrender.com/mangas/api/getLatest";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setRecentMangas(data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-8 bg-gray-100 min-h-screen">
      <span className="text-3xl font-bold text-gray-800 mb-6 max-sm:text-2xl">Big Three Collection</span>
      <Carousel className="w-full max-w-3xl"
      opts={{
        loop: true
      }}
      plugins={[
        AutoPlay({
          delay: 2000
        })
      ]}
      >
        <CarouselContent className="flex">
          {bigThreeCarousel.map((manga) => (
            <CarouselItem key={manga.id} className="flex-shrink-0 w-full">
              <img
                src={manga.image}
                alt={manga.name}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer" />
      </Carousel>
      <Link to="/catalog">
        <Button className="mt-6 flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          <FaArrowRight className="mr-2 h-4 w-4" />
          Check out collection
        </Button>
      </Link>
      <div className="flex flex-col justify-center items-center mt-12 w-full">
        <span className="text-3xl font-bold text-gray-800 mb-6">Recent Mangas</span>
        <div className="flex flex-wrap justify-center items-center w-full">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            recentMangas.map((manga) => (
              <MangaCard manga={manga} key={manga._id} />
            ))
          )}
        </div>
        <Link to="/catalog">
          <Button className="mt-6 flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            <FaArrowRight className="mr-2 h-4 w-4" />
            Check All Mangas
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
