import express from "express";
import rootRouter from "./routes";
import cors from "cors";
import session from "express-session";
import Keycloak from "keycloak-connect";
import { type EnvVariable, url } from "./utils";

const PORT = process.env.BEMED_API_PORT || 3000;
const {
  KEYCLOAK_BACKEND_CLIENT_ID,
  KEYCLOAK_REALM,
} = process.env as Record<EnvVariable, string>;

console.debug(`Auth server URL: ${url.keycloak.toString()}`);

const app = express();
const PORT = process.env.BEMED_API_PORT || 3000;

console.log("PORT", PORT);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// Use the root router for all routes
app.use("/", rootRouter);

// Start the server
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
