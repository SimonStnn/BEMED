import { Router } from "express";

import loginRouter from "./login";
import surveyRouter from "./survey";

const router = Router();

router.use("/login", loginRouter);

router.use("/survey", surveyRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
