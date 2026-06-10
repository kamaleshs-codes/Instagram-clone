import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import ViewStory from "./ViewStory.jsx";
import Profile from "./Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stories/:id/:tot",
    element: <ViewStory />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
