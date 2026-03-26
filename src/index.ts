import dotenv from "dotenv";
dotenv.config();

import express from "express";
import companyRoutes from "./routes/company.routes";
import jobRoutes from "./routes/job.routes";
import tagRoutes from "./routes/tag.routes";
import candidateRoutes from "./routes/candidate.routes";
import applicationRoutes from "./routes/application.routes";
import analyticsRoutes from "./routes/analytics.routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/companies", companyRoutes);
app.use("/jobs", jobRoutes);
app.use("/tags", tagRoutes);
app.use("/candidates", candidateRoutes);
app.use("/applications", applicationRoutes);
app.use("/analytics", analyticsRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

export default app