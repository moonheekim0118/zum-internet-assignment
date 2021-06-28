import express from "express";
import * as controller from "../controllers";

const router = express.Router();

router.get("/best", controller.best);
router.get("/content/:category/:idx", controller.contentsDetail);
router.get("/content/:category/", controller.contents);

export default router;
