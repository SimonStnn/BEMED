import { Router } from "express";

import surveyRouter from "@/routes/survey";

const router = Router();

router.use("/survey", surveyRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
