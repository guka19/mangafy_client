import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import MangaPage from "./pages/MangaPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/mangas/:id", element: <MangaPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout/:totalPrice", element: <CheckoutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
        <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
