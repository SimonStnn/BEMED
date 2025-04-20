import { Request, Router, type Response } from "express";

// import keycloak from "@/middleware/keycloak";
import TreatmentController from "@/controllers/treatmentController";

const router = Router();
// router.use(keycloak.protect());

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json(
    await TreatmentController.get(
      {
        userId: (req as any).kauth?.grant.access_token.content.sub,
        id: req.query.id ? Number(req.query.id) : undefined,
      },
      Number(req.query.skip) || 0,
      Number(req.query.limit) || 10
    )
  );
});

router.post("/", async (req: Request, res: Response) => {
  res.status(201).json(
    await TreatmentController.create(
      (req as any).kauth?.grant.access_token.content.sub,
      req.body.answers.map((answer: any) => {
        return {
          questionId: Number(answer.questionId),
          answer: String(answer.answer),
        };
      })
    )
  );
});

router.delete("/", async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      await TreatmentController.delete(
        (req as any).kauth?.grant.access_token.content.sub,
        Number(req.body.id)
      )
    );
});

export default router;
