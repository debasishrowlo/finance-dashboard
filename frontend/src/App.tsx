import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import jsCookie from "js-cookie"

import { routes, cookies } from "./constants"
import AppContext from "./AppContext"

import AuthGuard from "./AuthGuard"
import SidebarLayout from "./layouts/SidebarLayout"

import Login from "./pages/Login"
import Overview from "./pages/Overview"
import Pots from "./pages/Pots"

const getCookie = (name:string) => {
  return jsCookie.get(name)
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const syncAuthState = () => {
    const loggedInCookie = getCookie(cookies.isLoggedIn)
    setIsLoggedIn(loggedInCookie !== undefined)
    setIsInitialized(true)
  }

  useEffect(() => {
    syncAuthState()
  }, [])

  const contextValues = {
    isLoggedIn, 
    isInitialized,
    syncAuthState,
  }

  return (
    <AppContext.Provider value={contextValues}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route element={<SidebarLayout />}>
              <Route path={routes.overview} element={<Overview />} />
              <Route path={routes.pots} element={<Pots />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
