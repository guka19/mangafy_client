import { useEffect, useState } from "react";
import Manga from "@/interfaces/Manga";
import { Button } from "@/components/ui/button";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";

const CartPage = () => {
  const [cart, setCart] = useState<{ items: { mangaId: string; quantity: number; _id: string; }[] } | null>(null);
  const [mangaMap, setMangaMap] = useState<Map<string, Manga>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="flex flex-col my-16 justify-center items-center space-y-4">
        <span className="text-xl">Login first to access cart</span>
        <Link to="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://mangafy-api.onrender.com/carts/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCart(data);

        const mangaIds = data.items.map((item: any) => item.mangaId);
        const mangaResponses = await Promise.all(
          mangaIds.map((id: string) =>
            fetch(`https://mangafy-api.onrender.com/mangas/api/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            })
          )
        );

        const mangaData = await Promise.all(mangaResponses.map((res) => res.json()));
        const mangaMap = new Map<string, Manga>();
        mangaData.forEach((manga: Manga) => {
          if (manga && manga._id) {
            mangaMap.set(manga._id, manga);
          }
        });
        setMangaMap(mangaMap);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const handleUpdate = async (mangaId: string, quantity: number) => {
    try {
      const response = await fetch('https://mangafy-api.onrender.com/carts/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ mangaId, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update cart');
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (mangaId: string) => {
    try {
      const response = await fetch('https://mangafy-api.onrender.com/carts/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ mangaId }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete from cart');
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('https://mangafy-api.onrender.com/carts/api/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      // Clear the cart on the client side
      setCart(null);
      navigate(`/checkout/${calculateTotalPrice().toFixed(2)}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const calculateTotalPrice = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      const manga = mangaMap.get(item.mangaId);
      return manga ? total + manga.price * item.quantity : total;
    }, 0);
  };

  if (loading) return (
    <div className="flex flex-wrap justify-center items-center w-full px-16">
      <Spinner loading={loading} />
    </div>
  );

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      {cart && cart.items.length > 0 ? (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => {
              const manga = mangaMap.get(item.mangaId);

              if (!manga) {
                return <p key={item._id} className="text-red-500 text-center">Manga details not available</p>;
              }

              return (
                <li key={item._id} className="flex flex-col md:flex-row items-center py-4">
                  <img src={manga.imageUrl} alt={manga.title} className="w-24 h-36 object-cover rounded-md mb-4 md:mb-0 md:mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-2">{manga.title} Volume {manga.volume}</h2>
                    <p className="text-gray-700 mb-1">By: {manga.author}</p>
                    <p className="text-gray-900 mb-2">${manga.price.toFixed(2)}</p>
                    <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleUpdate(item.mangaId, item.quantity + 1)} className="bg-blue-500 hover:bg-blue-600 text-white">
                        <FaEdit className="mr-2" /> Increase Quantity
                      </Button>
                      <Button onClick={() => handleDelete(item.mangaId)} className="bg-red-500 hover:bg-red-600 text-white">
                        <FaTrashAlt className="mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center border-t border-gray-200 pt-6">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Total Price:</h2>
            <p className="text-2xl font-semibold">${calculateTotalPrice().toFixed(2)}</p>
          </div>
          <div className="mt-6 text-center">
            <Button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Buy Now
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
