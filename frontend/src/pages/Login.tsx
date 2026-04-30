import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { routes, apiRoutes } from "../constants"
import { useAppContext } from "../AppContext"

const Login = () => {
  const navigate = useNavigate()

  const { isLoggedIn, syncAuthState } = useAppContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()

    const response = await fetch(apiRoutes.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      })
    })

    if (response.ok) {
      syncAuthState()
      navigate(routes.overview)
    } else {
      console.error("Login failed")
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(routes.overview)
    }
  }, [isLoggedIn])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login