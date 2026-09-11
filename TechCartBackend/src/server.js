import express from "express";
import path from "path";
import { ENV } from "./config/env.js";

const app = express();
const __dirname = path.resolve();

app.get("api/health", (req, res) => {
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

app.listen(ENV.PORT, () => console.log("Server is up and running"));
