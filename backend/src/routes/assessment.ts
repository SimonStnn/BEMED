import { Request, Router, type Response } from "express";
import AssessmentController from "@/controllers/assessmentController";
import keycloak from "@/middleware/keycloak";

const router = Router();
router.use(keycloak.protect());

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json(
    await AssessmentController.get(
      {
        userId: (req as any).kauth?.grant.access_token.content.sub,
        productId: req.query.productId
          ? Number(req.query.productId)
          : undefined,
      },
      req.query.skip as any,
      req.query.limit as any
    )
  );
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json(
    await AssessmentController.create({
      userId: (req as any).kauth?.grant.access_token.content.sub,
      productId: Number(req.body.productId),
      ppm: Number(req.body.ppm),
    })
  );
});

router.put("/", (req: Request, res: Response) => {});

router.delete("/", (req: Request, res: Response) => {});

export default router;
