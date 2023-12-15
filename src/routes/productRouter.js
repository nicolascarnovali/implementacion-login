import { Router } from "express";
import {validationProduct } from "../middelwares/validationMid.js";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/",validationProduct, controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

export default router;
