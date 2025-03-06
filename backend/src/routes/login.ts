import { Router, type Request, type Response } from "express";

const router = Router();

//* GET

router.get("/", (req: Request, res: Response) => {
  console.log("GET /login");
  console.log("query", req.query);
  res.status(200).json({ message: "Login page", data: req.query });
});

//* POST

router.post("/", (req: Request, res: Response) => {
  console.log("POST /login");
  console.log("body:", req.body);
  res.status(200).json({ message: "Login successful", data: req.body });
});

//* PUT

router.put("/", (req: Request, res: Response) => {
  console.log("PUT /login");
  console.log(req.body);
});

//* DELETE

router.delete("/", (req: Request, res: Response) => {
  console.log("DELETE /login");
  console.log(req.body);
});

export default router;
