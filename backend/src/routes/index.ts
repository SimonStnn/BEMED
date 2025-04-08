import { Router } from "express";

import surveyRouter from "@/routes/survey";
import productRouter from "@/routes/product";
import assessmentRouter from "@/routes/assessment";

const router = Router();

router.use("/survey", surveyRouter);
router.use("/product", productRouter);
router.use("/assessment", assessmentRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
