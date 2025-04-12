import { React, StrictMode } from "react";
import App from "./components/app/App";
import { createRoot, CreateRoot } from "react-dom/client";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)