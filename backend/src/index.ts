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
import { routes, cookies } from "./constants"

import User from "./models/User"
import RefreshToken from "./models/RefreshToken"

const tokenSchema = z.object({
  userId: z.string(),
})

type Token = z.infer<typeof tokenSchema>

const verifyToken = (token:string):Token => {
  const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
  return tokenSchema.parse(decoded)
}

const main = async () => {
  await mongoose.connect(env.DB_URL)

  const app = express()
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, "frontend")))

  // TODO: Add cors

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

  app.post(routes.register, async (request:Request, response:Response) => {
    const { email, password } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      response.status(409).json({ message: "User already exists" })
      return
    }

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

      const msPerSecond = 1000
      const secondsPerMinute = 60
      const minutes = 15
      const accessTokenLifetime = minutes * secondsPerMinute * msPerSecond

      const accessToken = jwt.sign({ userId: user._id }, env.ACCESS_TOKEN_SECRET, { expiresIn: accessTokenLifetime })

      const cookieOptions:CookieOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: accessTokenLifetime,
      }

      const refreshToken = jwt.sign({ userId: user._id }, env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

      await RefreshToken.findOneAndUpdate(
        { userId: user._id }, 
        { token: refreshToken }, 
        { upsert: true },
      )

      response.cookie(cookies.token, accessToken, {
        ...cookieOptions,
        httpOnly: true,
      })

      response.cookie(cookies.isLoggedIn, true, {
        ...cookieOptions,
        httpOnly: false,
      })

      response.status(200).json({})
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: "Login failed" })
    }
  })

  app.post(routes.logout, async (request:Request, response:Response) => {
    const token = request.cookies.token

    if (!token) {
      response.status(200).json({})
      return
    }

    const decodedToken = verifyToken(token)

    await RefreshToken.findOneAndDelete({
      userId: decodedToken.userId,
    })

    response.clearCookie(cookies.token)
    response.clearCookie(cookies.isLoggedIn)

    response.status(200).json({})
    return
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