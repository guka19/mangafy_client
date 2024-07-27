import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import MangaPage from "./pages/MangaPage";
const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="/catalog" element={<CatalogPage />}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mangas/:id" element={<MangaPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>
    )
  );

  return <RouterProvider router={router} />
};

export default App;
