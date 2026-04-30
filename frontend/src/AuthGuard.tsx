import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { useAppContext } from "./AppContext"
import { routes } from "./constants"

const AuthGuard = () => {
  const navigate = useNavigate()
  const { isInitialized, isLoggedIn } = useAppContext()

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      navigate(routes.login)
    }
  }, [isInitialized, isLoggedIn])

  return <Outlet />
}

export default AuthGuard