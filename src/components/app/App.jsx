import React from "react";
import Header from "../header/Header";
import './app.css'
import { Outlet } from "react-router";

 const App = () => {  
  return (
    <div className="appMain">
      <Header />
      <Outlet/>
    </div>
  );
};
export default App;