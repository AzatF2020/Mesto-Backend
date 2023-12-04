import Router from "express";
import AuthController from "../../controllers/authController";
import { validateAuth } from "../../utils/validator";

const router = Router()

router.post("/signup", validateAuth, AuthController.registration)
router.post("/signin", validateAuth, AuthController.login)
router.get("/logout", AuthController.logout)

export { router }
