import express from "express";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware()); // adds auth objects under the request  (req.auth, req.session, req.user, etc.)
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Sucess" });
});

// MAKE THE APP READY FOR DEPLOYMENT

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../TechCartAdmin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../TechCartAdmin", "dist", "index.html"),
    );
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
  });
};

startServer();
