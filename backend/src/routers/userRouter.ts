import { Router } from "express";
import { userLogin, userList, Register } from "../controllers/userController";
// import { userAuthMiddleware } from ".. /middlewares/userAuth";

const router = Router();

router.post('/login', userLogin);
router.post('/signup', Register);
// router.get("/user-list", userList);

export default router;