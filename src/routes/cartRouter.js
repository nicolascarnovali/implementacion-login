import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", cartController.create);
router.get("/", cartController.getAll);
router.get("/:id", cartController.getCartById);
router.post('/:cId/products/:idProd', cartController.update);

router.delete('/:cId/products/:idProd', cartController.remove);
router.delete('/:cId', cartController.removeCart);
router.delete('/:cId', cartController.removeAllProducts);
router.put("/:cId/products/:pId", cartController.updateQuantity)
router.put('/:cId', cartController.updateCart);




export default router;