import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { connectDB } from "./config/db";

import productRoutes from "./routes/productRoutes";

import { loadModel } from "./ml/classifier";

const app: Application = express();

app.use(cors());
app.use(express.json());

connectDB();
(async () => {
  await loadModel();
})();

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
