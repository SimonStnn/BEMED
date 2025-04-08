import { Request, Router, type Response } from "express";

import keycloak from "@/middleware/keycloak";
import ProductController from "@/controllers/productController";

const router = Router();
router.use(keycloak.protect());

router.get("/", async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      await ProductController.get(
        req.query.id as any,
        req.query.skip as any,
        req.query.limit as any
      )
    );
});

router.post("/", async (req: Request, res: Response) => {
  res.status(201).json(
    await ProductController.create({
      name: req.body.name,
      description: req.body.description || null,
      price: req.body.price || null,
      weight: req.body.weight || null,
      EF: req.body.EF || null,
    })
  );
});

router.put("/", async (req: Request, res: Response) => {
  res.status(200).json(
    await ProductController.update({
      id: req.body.id,
      name: req.body.name || undefined,
      description: req.body.description || undefined,
      price: req.body.price || undefined,
      weight: req.body.weight || undefined,
      EF: req.body.EF || undefined,
    })
  );
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json(await ProductController.delete(req.body.id));
  } catch (error) {
    if (error instanceof Error && error.message.includes("404"))
      res.sendStatus(404);
    else throw error;
  }
});

router.post("/alternative", async (req: Request, res: Response) => {
  res
    .status(201)
    .json(
      await ProductController.createAlternative(
        req.body.productId,
        req.body.alternativeId
      )
    );
});

router.delete("/alternative", async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      await ProductController.deleteAlternative(
        req.body.productId,
        req.body.alternativeId
      )
    );
});

export default router;
