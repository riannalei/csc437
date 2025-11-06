// src/index.ts
import express, { Request, Response } from "express";
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

connect("blazing"); // use your own db name here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

