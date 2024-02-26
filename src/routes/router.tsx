import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "../pages/AddProduct/AddProduct";
import Inventory from "../pages/Inventory/Inventory";
import Home from "../pages/Home/Home";
import ProductView from "../pages/Inventory/ProductView";
import EditProduct from "../pages/Inventory/EditProduct";
import CloneProduct from "../pages/AddProduct/CloneProduct";
import SellHistory from "../pages/SellHistory/SellHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main></Main>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "add-product/:id",
        element: <CloneProduct></CloneProduct>,
      },
      {
        path: "add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "inventory/product/:id",
        element: <ProductView />,
      },
      {
        path: "inventory/product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "sell-history",
        element: <SellHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
