import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import companyRoutes from "./routes/company.routes";
import jobRoutes from "./routes/job.routes";
import tagRoutes from "./routes/tag.routes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/companies", companyRoutes);
app.use("/jobs", jobRoutes);
app.use("/tags", tagRoutes);

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  console.error(err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
