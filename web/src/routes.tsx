import { createBrowserRouter } from "react-router-dom";
import { ClientPage } from "./pages/ClientPage";
import { CarPage } from "./pages/CarPage";

export const routes = createBrowserRouter([
  {
    path: "/clients",
    element: <ClientPage />,
  },
  {
    path: "/cars",
    element: <CarPage />,
  },
]);
