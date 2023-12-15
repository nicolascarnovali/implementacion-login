import { Router } from "express";
import UserController from "../controllers/user.controller.js";
const controller = new UserController();
const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        await controller.register(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.post('/login',  async (req,res,next) => {
    try {
        await controller.login(req,res,next);
    } catch (error) {
        next(error);
    }
});
export default router;

