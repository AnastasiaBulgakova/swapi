import { createBrowserRouter } from "react-router";
import ErrorIndicator from "../components/errorIndicator/ErrorIndicator.jsx";
import App from "../components/app/App.jsx";
import CharacterPage from "../components/CharacterPage/CharacterPage.jsx";
import MainPage from "../components/MainPage/MainPage.jsx";
import PlanetPage from "../components/PlanetPage/PlanetPage.jsx";
import StarshipPage from "../components/StarshipPage/StarshipPage.jsx";

export const mainRoutes = createBrowserRouter([
    {
        errorElement: <ErrorIndicator/>,
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <MainPage/>
            },
            {
                path: '/persons',
                element: <CharacterPage/>
            },
            {
                path: 'planets',
                element: <PlanetPage/>
            },
            {
                path: 'starships',
                element: <StarshipPage/>
            }
        ]
    }
])