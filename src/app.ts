import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet";

import { errors } from "celebrate"
import { requestLogger, errorLogger } from "./middleware/logger.middleware";

import DBConnection from "./database/database";
import checkModelsStatus from "./models";
import isCandidateAuthMiddleware from "./middleware/auth.middleware";
import errorMiddleware from "./middleware/error.middleware";

import { router } from "./routes"
import { router as authRoute } from "./routes/auth/auth"

import "dotenv/config"

const { PORT = 8080, MONGO_URL } = process.env
const app = express()

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(requestLogger)
app.use("/auth", authRoute)

app.use(isCandidateAuthMiddleware)

app.use(router)
app.use(errorLogger)
app.use(errors())
app.use(errorMiddleware)

async function startServer() {
  try {
    app.listen(PORT, () => console.log(`server is working on port = ${PORT}`))
    await DBConnection(MONGO_URL!)
    await checkModelsStatus()
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err?.message)
    }
  }
}

startServer()
