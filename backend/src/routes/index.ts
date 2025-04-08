import { Router } from "express";

import surveyRouter from "@/routes/survey";
import productRouter from "@/routes/products";

const router = Router();

router.use("/survey", surveyRouter);
router.use("/product", productRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
