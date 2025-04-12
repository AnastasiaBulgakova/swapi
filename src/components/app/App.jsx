import React, { useState } from "react";
import Header from "../header/Header";
import RandomPlanet from '../randomPlanet/RandomPlanet'
import './app.css'
import PeoplePage from "../peoplePage/PeoplePage";

 const App = () => {  
    const UserContext = React.createContext({})
   const [showRandomPlanet] = useState(true)
  return (
    <div className="appMain">

      <Header />
      <UserContext.Provider value={showRandomPlanet}>
      <RandomPlanet /> 
      </UserContext.Provider>
      <PeoplePage/>
   
    </div>
  );
};
export default App;