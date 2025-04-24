import { Request, Router, type Response } from "express";
import jwtMiddleware from "@/middleware/jwt";
import TreatmentController from "@/controllers/treatmentController";

const router = Router();
router.use(jwtMiddleware.protect());

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json(
    await TreatmentController.get(
      {
        userId: (req as any).auth?.sub,
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
      (req as any).auth?.sub,
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
        (req as any).auth?.sub,
        Number(req.body.id)
      )
    );
});

export default router;
