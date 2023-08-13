import { Router } from "express";
import * as productService from "../services/product.services.js";
import * as cartService from "../services/cart.services.js";

import * as controller from "../controllers/view.controller.js";

const router = Router();

router.get("/products", controller.productsView);
router.get("/carts/:id", controller.cartView);
router.get("/register", controller.registerView);
router.get("/error-register", controller.errorRegisterView);
router.get("/login", controller.loginView);
router.get("/error-login", controller.errorLoginView);

export default router;
