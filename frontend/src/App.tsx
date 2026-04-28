import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import cookies from "js-cookie"

import { routes } from "./constants"
import AppContext from "./AppContext"

import SidebarLayout from "./layouts/SidebarLayout"

import Login from "./pages/Login"
import Overview from "./pages/Overview"
import Pots from "./pages/Pots"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (cookies.get("isLoggedIn") !== undefined) {
      setIsLoggedIn(true)
    }
  }, [])

  const contextValues = {
    isLoggedIn, 
    setIsLoggedIn,
  }

  return (
    <AppContext.Provider value={contextValues}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Login />} />
          <Route element={<SidebarLayout />}>
            <Route path={routes.overview} element={<Overview />} />
            <Route path={routes.pots} element={<Pots />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
