import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);
