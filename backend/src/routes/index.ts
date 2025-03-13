import { Router } from "express";

import loginRouter from "./login";

const router = Router();

router.use("/login", loginRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
