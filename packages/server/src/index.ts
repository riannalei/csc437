// src/index.ts
import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";
import travelers from "./routes/travelers";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

// Middleware:
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/auth", auth);
app.use("/api/travelers", authenticateUser, travelers);

// Serve login.html and newuser.html explicitly
app.get("/login.html", (req: Request, res: Response) => {
  const loginHtml = path.resolve(staticDir, "login.html");
  fs.readFile(loginHtml, { encoding: "utf8" })
    .then((html) => res.send(html))
    .catch(() => res.status(404).send("Login page not found"));
});

app.get("/newuser.html", (req: Request, res: Response) => {
  const newuserHtml = path.resolve(staticDir, "newuser.html");
  fs.readFile(newuserHtml, { encoding: "utf8" })
    .then((html) => res.send(html))
    .catch(() => res.status(404).send("Signup page not found"));
});

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

connect("blazing"); // use your own db name here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

