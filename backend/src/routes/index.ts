import express from "express";
import * as controller from "../controllers";

const router = express.Router();

router.get("/best", controller.best);
router.get("/content/:category/:idx", controller.contentsInfinite);
router.get("/content", controller.contents);
router.get("/detail/:idx", controller.contentsDetail);

export default router;
