import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { routes } from "./constants"

import SidebarLayout from "./layouts/SidebarLayout"

import Login from "./pages/Login"
import Overview from "./pages/Overview"
import Pots from "./pages/Pots"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Login />} />
        <Route element={<SidebarLayout />}>
          <Route path={routes.overview} element={<Overview />} />
          <Route path={routes.pots} element={<Pots />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
