import express from "express";
import rootRouter from "./routes";
import cors from "cors";

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
