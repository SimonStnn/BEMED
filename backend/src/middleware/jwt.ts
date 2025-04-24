import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { type EnvVariable, url } from "@/utils";

const { KEYCLOAK_REALM, KEYCLOAK_CLIENT_SECRET } = process.env as Record<
  EnvVariable,
  string
>;

// JWT middleware for protected routes - modified to just check token presence
export const protect: any =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
        return res.status(401).json({
          message: "No token provided",
        });
      }

      const token = authHeader.split(" ")[1];

      // Just decode the token without verification (for debugging)
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token format",
        });
      }

      // Add the decoded token to the request for use in routes
      (req as any).auth = decoded;

      next();
    } catch (error) {
      console.error("Error processing token:", error);
      return res.status(401).json({
        message: "Token processing error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

// Middleware to handle JWT errors
export const handleJwtErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    console.error("JWT Validation Error:", err);
    return res.status(401).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
  next(err);
};

// Helper function to generate tokens (useful for testing or if you need to create tokens)
export const generateToken = (payload: object, expiresIn = "1h") => {
  return (jwt as any).sign(payload, KEYCLOAK_CLIENT_SECRET, { expiresIn });
};

export default { protect, handleJwtErrors, generateToken };
