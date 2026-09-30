import { createBrowserRouter, RouterProvider } from "react-router";
import {
  Analytics,
  Customers,
  Dashboard,
  Layout,
  Order,
  Product,
  Settings,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "orders", element: <Order /> },
      { path: "customer", element: <Customers /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
