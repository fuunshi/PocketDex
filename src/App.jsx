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
          errorElement: <ErrorPage />,
          children: [
            {
              path: ":id/",
              element: <Pokemons />,
              errorElement: <ErrorPage />,
            },
          ],
        },
        {
          path: "berries/",
          element: <BerriesList />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: ":id/",
              element: <Berries />,
              errorElement: <ErrorPage />,
            },
          ],
        },
        {
          path: "locations/",
          element: <LocationsList />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: ":id/",
              element: <Locations />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
  },
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
