import { type Request, type Response, type NextFunction } from "express";

export default function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
}
