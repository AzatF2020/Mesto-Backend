var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import DBConnection from "./database/database.js";
import checkModelsStatus from "./models";
import errorMiddleware from "./middleware/error.middleware.js";
import cors from "cors";
import { router as userRouter } from "./routes/users.js";
import { router as cardsRouter } from "./routes/cards.js";
import "dotenv/config";
const { PORT = 8080, MONGO_URL } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
// #NOTE: временное решение
app.use((req, res, next) => {
    req.user = {
        _id: "" // #HINT: User_ID
    };
    next();
});
app.use("/users", userRouter);
app.use("/cards", cardsRouter);
app.use(errorMiddleware);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(PORT, () => console.log(`server is working on port = ${PORT}`));
            yield DBConnection(MONGO_URL);
            yield checkModelsStatus();
        }
        catch (err) {
            if (err instanceof Error)
                throw new Error(err === null || err === void 0 ? void 0 : err.message);
        }
    });
}
startServer();
