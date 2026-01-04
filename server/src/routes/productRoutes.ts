import { Router, Request, Response } from "express";
import Product from "../models/Product";
import { calculateEcoScore } from "../services/scoringService";
import { generateExplanation } from "../services/aiService";
import { IProduct } from "../types/Product";
import { classifySustainability, getClassProbabilities } from "../ml/classifier";
import { extractKeywordEvidence, buildExplanation } from "../ml/explainability";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not Found" });

  const score = calculateEcoScore(product);

  const text = `
    ${product.description ?? ""}
    ${(product.materials ?? []).join(" ")}
    ${(product.eco_tags ?? []).join(" ")}
  `;

  const ai_label = classifySustainability(text);
  const probabilities = getClassProbabilities(text);
  const evidence = extractKeywordEvidence(text);
  const explanation = buildExplanation(ai_label, evidence);

  res.json({
    ...product.toObject(),
    ai_label,
    ai_probabilities: probabilities,
    keyword_evidence: evidence,
    ai_explanation: explanation
  });
});

router.post("/", async (req: Request, res: Response) => {
  const data: IProduct = req.body;

  const score = calculateEcoScore(data);
  data.eco_score = score;

  const product = await Product.create(data);

  return res.json({
    ...product.toObject(),
    explanation: generateExplanation(data, score),
  });
});

router.get("/:id/recommendations", async (req: Request, res: Response) => {
  const base = await Product.findById(req.params.id);
  if (!base) return res.status(404).json({ message: "Not Found" });

  const recs = await Product.find({
    category: base.category,
    _id: { $ne: base._id },
  })
    .sort({ eco_score: -1 })
    .limit(5);

  res.json(recs);
});

export default router;
