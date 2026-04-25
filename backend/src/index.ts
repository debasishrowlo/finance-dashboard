import express from "express"
import type { CookieOptions, Request, Response } from "express"
import path from "path"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import * as z from "zod"
import "dotenv/config"

import env from "./env"
import { routes } from "./constants"

import User from "./models/User"

const tokenSchema = z.object({
  userId: z.string(),
})

type Token = z.infer<typeof tokenSchema>

const verifyToken = (token:string):Token => {
  const decoded = jwt.verify(token, env.JWT_SECRET)
  return tokenSchema.parse(decoded)
}

const main = async () => {
  await mongoose.connect(env.DB_URL)

  const app = express()
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, "frontend")))

  app.get("/api/test", (request:Request, response:Response) => {
    const token = request.cookies.token
    
    if (!token) {
      response.status(401).json()
      return
    }

    try {
      const decodedToken = verifyToken(token)
      response.status(200).json({ success: true })
      return
    } catch (e) {
      response.status(401).json()
      return
    }
  })

  app.post(routes.signup, async (request:Request, response:Response) => {
    const { email, password } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      email,
      password: hashedPassword,
    })

    response.status(201).json({})
  })

  app.post(routes.login, async (request:Request, response:Response) => {
    try {
      const { email, password } = request.body

      const user = await User.findOne({ email })

      if (user === null) {
        response.status(401).json({ message: "Invalid username or password" })
        return
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        response.status(401).json({ message: "Invalid username or password" })
        return
      }

      const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "1h" })

      const oneHourInMs = 1 * 60 * 60 * 1000
      const cookieOptions:CookieOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: oneHourInMs,
      }
      response.cookie("token", token, {
        ...cookieOptions,
        httpOnly: true,
      })
      response.cookie("isLoggedIn", token, {
        ...cookieOptions,
        httpOnly: false,
      })

      response.status(200).json({})
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: "Login failed" })
    }
  })

  app.all('/api/*', (_, response: Response) => {
    response.json({ data: "Not found" })
  })

  app.get('/*', (_, response: Response) => {
    response.sendFile(path.join(__dirname, "/frontend/index.html"))
  })

  const port = env.PORT
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()