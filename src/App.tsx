import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="/catalog" element={<CatalogPage />}/>
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>
    )
  );

  return <RouterProvider router={router} />
};

export default App;
