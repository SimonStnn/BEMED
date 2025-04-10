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
      req.query.skip ? Number(req.query.skip) : undefined,
      req.query.limit ? Number(req.query.limit) : undefined
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

router.put("/", async (req: Request, res: Response) => {
  res.status(200).json(
    await AssessmentController.update({
      id: Number(req.body.id),
      ppm: Number(req.body.ppm),
    })
  );
});

router.delete("/", async (req: Request, res: Response) => {
  res.status(200).json(await AssessmentController.delete(Number(req.body.id)));
});

export default router;
