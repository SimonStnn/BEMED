import { Router } from "express";

import loginRouter from "./login";

const router = Router();

router.use("/login", loginRouter);

import surveyRouter from "./survey";

router.use("/survey", surveyRouter);

export default router;