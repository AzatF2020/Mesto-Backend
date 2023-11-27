import express, {NextFunction, Request, Response} from "express"
import DBConnection from "./database/database.js";
import checkModelsStatus from "./models";
import errorMiddleware from "./middleware/error.middleware.js";
import cors from "cors"

import { router } from "./routes"
import { errors } from "celebrate"

import "dotenv/config"

const {PORT = 8080, MONGO_URL} = process.env
const app = express()

app.use(express.json())
app.use(cors())

// #NOTE: временное решение
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: "656461b05b11930019c35931" // #HINT: User_ID
  }
  next()
})

app.use(router)
app.use(errors())
app.use(errorMiddleware)

async function startServer() {
  try {
    app.listen(PORT, () => console.log(`server is working on port = ${PORT}`))
    await DBConnection(MONGO_URL!)
    await checkModelsStatus()
  } catch (err) {
    if(err instanceof Error) throw new Error(err?.message)
  }
}

startServer()
