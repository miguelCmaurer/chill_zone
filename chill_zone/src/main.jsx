import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Zone } from "./components/Zone";
import App from "./App.jsx";
import { Home } from "./components/Home";
import Test from "./components/Listen";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "zone",
        Component: Zone,
      },
      {
        path: "listen",
        Component: Test,
      },
      {
        path: "recent",
        Component: () => {
          return <p>Recently Played</p>;
        },
      },
      {
        path: "saved",
        Component: () => {
          return <p>Saved</p>;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  // </StrictMode>,
);
