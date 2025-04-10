import { Router } from "express";

import docsRouter from "@/routes/docs";
import treatmentRouter from "@/routes/treatment";
import productRouter from "@/routes/product";
import assessmentRouter from "@/routes/assessment";

const router = Router();


router.use("/assessment", assessmentRouter);
router.use("/docs", docsRouter); // Swagger UI
router.use("/product", productRouter);
router.use("/treatment", treatmentRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
