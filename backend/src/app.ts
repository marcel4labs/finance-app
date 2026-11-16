import express, { type Express, type Request, type Response } from "express";
import db from "./db";

const app: Express = express();

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/transactions", (req: Request, res: Response) => {
  const rows = db.prepare("SELECT * FROM transactions").all();
  res.json(rows);
});

export default app;
