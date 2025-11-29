import express, { Request, Response } from "express";
import Trips from "../services/trip-svc";
import { Trip } from "../models/trip";

const router = express.Router();

function requireUserId(req: Request): string {
  const username = (req as any).username as string | undefined;
  if (!username) throw new Error("Missing authenticated user");
  return username;
}

router.get("/", (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req);
    Trips.index(userId)
      .then((list: Trip[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

router.get("/:id", (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req);
    const { id } = req.params;
    Trips.get(userId, id)
      .then((trip: Trip | null) => {
        if (trip) res.json(trip);
        else res.status(404).send(`${id} Not Found`);
      })
      .catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req);
    const body = req.body as Omit<Trip, "userId">;
    Trips.create(userId, body)
      .then((trip: Trip) => res.status(201).json(trip))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

router.put("/:id", (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req);
    const { id } = req.params;
    const body = req.body as Partial<Trip>;
    Trips.update(userId, id, body)
      .then((trip: Trip) => res.json(trip))
      .catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req);
    const { id } = req.params;
    Trips.remove(userId, id)
      .then(() => res.status(204).end())
      .catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

export default router;


