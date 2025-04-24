import express from "express";
import "express-async-errors";

import { url } from "@/utils"; // Utils needs to be imported first
import rootRouter from "@/routes";
import { setupMiddleware } from "@/middleware";
import jwtMiddleware from "@/middleware/jwt";

const PORT = process.env.BEMED_API_PORT || 3000;

console.debug(`Auth server URL: ${url.keycloak}`);

const app = express();

setupMiddleware(app);

app.set("trust proxy", true);

// Use the root router for all routes
app.use("/", rootRouter);

// Example protected endpoint using JWT middleware
app.get("/protected", jwtMiddleware.protect(), (req, res) => {
  res.send("Protected resource accessed via JWT");
});

// Start the server
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
