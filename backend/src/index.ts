import express, { Request, Response } from "express"
import path from "path"

const app = express()
const port = 8000

app.use(express.static(path.join(__dirname, "frontend")))

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ data: "Test" })
})

app.all('/api/*', (req: Request, res: Response) => {
  res.json({ data: "Not found" })
})

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/frontend/index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})