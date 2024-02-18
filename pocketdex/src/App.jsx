import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Base from './components/core/base'
import ErrorPage from './components/core/error404'
import {
  Pokemon, Berries, Locations
} from "./components/pages/mons";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Base />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'pokemon/',
          element: <Pokemon />
        },
        {
          path: "berries/",
          element: <Berries />
        },
        {
          path: "locations/",
          element: <Locations />
        }
      ]
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
