import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import memoRoutes from "./routes/memoRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const __dirname = path.resolve();

// CORS must run before the rate limiter.
// If the rate limiter returns 429 first, the response won't include
// Access-Control-Allow-Origin headers, causing the browser to show
// a misleading CORS/Network Error instead of the actual 429 response.

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/memos", memoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (request, response) => {
    response.sendFile(
      path.join(__dirname, "frontend/dist/index.html"),
    );
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
