import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes.jsx";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={mainRoutes} />
  </React.StrictMode>
);
