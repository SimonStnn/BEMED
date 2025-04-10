import path from "path";
import fs from "fs";
import { Request, Router, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";

import keycloak from "@/middleware/keycloak";

const router = Router();

const openApiPath = path.resolve(__dirname, "..", "..", "openapi.yaml");
const swaggerDocument = fs.existsSync(openApiPath)
  ? (yaml.load(fs.readFileSync(openApiPath, "utf8")) as Record<string, any>)
  : undefined;

router.use(swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
