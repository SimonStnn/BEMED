import { Request, Router, type Response } from "express";
import jwtMiddleware from "@/middleware/jwt";
import ProductController from "@/controllers/productController";

const router = Router();
// Apply JWT protection to certain routes that need authentication
const protectedRouter = Router();
protectedRouter.use(jwtMiddleware.protect());

// Public routes
router.get("/", async (req: Request, res: Response) => {
  let productId: number | number[] | undefined;
  if (req.query.id) {
    const idParam = String(req.query.id);
    if (idParam.includes(",")) {
      // Handle comma-separated list of IDs
      productId = idParam
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));
    } else {
      // Handle single ID
      const parsedId = Number(idParam);
      productId = !isNaN(parsedId) ? parsedId : undefined;
    }
  } else {
    productId = undefined;
  }

  res
    .status(200)
    .json(
      await ProductController.get(
        productId,
        req.query.skip ? Number(req.query.skip) : undefined,
        Array.isArray(productId)
          ? productId.length
          : req.query.limit
          ? Number(req.query.limit)
          : undefined
      )
    );
});

// Protected routes
protectedRouter.post("/", async (req: Request, res: Response) => {
  res.status(201).json(
    await ProductController.create({
      name: req.body.name,
      description: req.body.description || null,
      price: req.body.price ? Number(req.body.price) : null,
      weight: req.body.weight ? Number(req.body.weight) : null,
      EF: req.body.EF ? Number(req.body.EF) : null,
    })
  );
});

protectedRouter.put("/", async (req: Request, res: Response) => {
  res.status(200).json(
    await ProductController.update({
      id: req.body.id,
      name: req.body.name || undefined,
      description: req.body.description || undefined,
      price: req.body.price ? Number(req.body.price) : undefined,
      weight: req.body.weight ? Number(req.body.weight) : undefined,
      EF: req.body.EF ? Number(req.body.EF) : undefined,
    })
  );
});

protectedRouter.delete("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json(await ProductController.delete(Number(req.body.id)));
  } catch (error) {
    if (error instanceof Error && error.message.includes("404"))
      res.sendStatus(404);
    else throw error;
  }
});

protectedRouter.post("/alternative", async (req: Request, res: Response) => {
  res
    .status(201)
    .json(
      await ProductController.createAlternative(
        Number(req.body.productId),
        Number(req.body.alternativeId)
      )
    );
});

protectedRouter.delete("/alternative", async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      await ProductController.deleteAlternative(
        Number(req.body.productId),
        Number(req.body.alternativeId)
      )
    );
});

protectedRouter.get("/used", async (req: Request, res: Response) => {
  res.status(200).json(
    await ProductController.getUsedProducts(
      (req as any).auth?.sub, // Changed from req.kauth to req.auth
      req.query.skip ? Number(req.query.skip) : undefined,
      req.query.limit ? Number(req.query.limit) : undefined
    )
  );
});

// Include protected routes
router.use(protectedRouter);

export default router;
