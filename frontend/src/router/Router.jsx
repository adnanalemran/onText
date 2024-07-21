
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/Home/HomePage";
import LandingHub from "../hub/LandingHub";
import ErrorPage from "../components/common/ErrorPage";
import Note from "../page/Home/Note";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingHub />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      }
      , {
        path: "/:noteTitle",
        element: <Note />,
      }
    ],
  },
]);
