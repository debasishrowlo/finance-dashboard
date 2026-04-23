import { FormEvent, useState } from "react"

const Login = () => {

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input type="text" />
        <p>Password</p>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login