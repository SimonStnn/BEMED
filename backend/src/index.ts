import express from "express";

import { url } from "@/utils"; // Utils needs to be imported first
import rootRouter from "@/routes";
import { setupMiddleware } from "./middleware";
import keycloak from "@/middleware/keycloak";

const PORT = process.env.BEMED_API_PORT || 3000;

console.debug(`Auth server URL: ${url.keycloak}`);

const app = express();

setupMiddleware(app);

app.set("trust proxy", true);

// Use the root router for all routes
app.use("/", rootRouter);

app.get("/protected", keycloak.protect(), (req, res) => {
  res.send("Protected resource");
});

// Start the server
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
