import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Base from './components/core/base'
import ErrorPage from './components/core/error404'
import {
  PokemonsList, BerriesList, LocationsList,
  Pokemons, Berries, Locations,
} from "./components/pages/mons";
import LoadingAnimation from "./components/core/loading";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Base />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "pokemon/",
          element: <PokemonsList />,
          children: [
            {
              path: ":id/",
              element: <Pokemons />,
            },
          ],
        },
        {
          path: "berries/",
          element: <BerriesList />,
          children: [
            {
              path: ":id/",
              element: <Berries />,
            },
          ],
        },
        {
          path: "locations/",
          element: <LocationsList />,
          children: [
            {
              path: ":id/",
              element: <Locations />,
            },
          ],
        },
      ],
  },
  {
    path:"/bruh/check",
    element: <LoadingAnimation />
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
