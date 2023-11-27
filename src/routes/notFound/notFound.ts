import Router, {NextFunction, Response, Request} from "express"
import ApiError from "../../exceptions/api-error";

const router = Router()

router.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.NotFound("route not found"))
})

export { router }