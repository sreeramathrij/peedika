import type { Request, Response } from "express";
import Product from "../models/Product";
import Cart from "../models/Cart";
import { detectIntent } from "../services/intent";
import { generateCopilotResponse } from "../services/llm";

export const copilot = async (req: Request, res: Response) => {
  const { message } = req.body;

  const intent = detectIntent(message);

  switch (intent) {
    case "RECOMMEND":
      return recommendProducts(message, res);

    case "CART_EVAL":
      return evaluateCart(res);

    case "GREENER_ALTERNATIVES":
      return greenerSuggestions(message, res);

    case "PRODUCT_INFO":
      return explainProduct(message, res);

    default:
      return res.json({
        intent,
        response: "I'm not fully sure, but I can help you explore eco-friendly options 🌿"
      });
  }
};

const recommendProducts = async (message: string, res: Response) => {
  const priceMatch = message.match(/under\s?(\d+)/i);
  const priceLimit = priceMatch ? Number(priceMatch[1]) : undefined;

  const query: any = {};
  if (priceLimit) query.price = { $lte: priceLimit };

  const products = await Product.find(query)
    .sort({ eco_score: -1 })
    .limit(5);

  return res.json({
    intent: "RECOMMEND",
    response: "Here are some great eco-friendly picks 🌿",
    products
  });
};

const evaluateCart = async (res: Response) => {
  const cart = await Cart.findOne({ user: (res as any).user._id })
    .populate("items.product");

  if (!cart || !cart.items.length)
    return res.json({ response: "Your cart is empty." });

  const avg = cart.cartEcoScore;

  return res.json({
    intent: "CART_EVAL",
    score: avg,
    response:
      avg >= 75
        ? "Your cart is very eco-friendly! 🌍"
        : avg >= 50
        ? "Your cart is moderately eco-friendly. Want to improve it?"
        : "Your cart could be greener — I can suggest swaps 🌱"
  });
};

const findProductFromMessage = async (message: string) => {
  const words = message
    .toLowerCase()
    .split(" ")
    .filter(w => w.length > 2);

  return Product.findOne({
    name: { $regex: words.join("|"), $options: "i" }
  });
};

const greenerSuggestions = async (message: string, res: Response) => {
  const product = await findProductFromMessage(message);

  if (!product)
    return res.json({
      intent: "GREENER_ALTERNATIVES",
      aiMessage: "I couldn't match any product from your message. Try mentioning the product name 🌿"
    });

  const alternatives = await Product.find({
    category: product.category,
    eco_score: { $gt: product.eco_score },
    price: {
      $gte: product.price * 0.8,
      $lte: product.price * 1.2
    },
    _id: { $ne: product._id }
  })
    .sort({ eco_score: -1 })
    .limit(5);

  const structured = {
    type: "GREENER_ALTERNATIVES",
    current: {
      name: product.name,
      eco_score: product.eco_score,
      price: product.price
    },
    alternatives: alternatives.map(p => ({
      name: p.name,
      eco_score: p.eco_score,
      price: p.price,
      improvement: p.eco_score - product.eco_score
    }))
  };

  let aiMessage = "";
  try {
    aiMessage = await generateCopilotResponse(message, structured);
  } catch {
    aiMessage = "Here are some greener options 🌿";
  }

  return res.json({
    intent: "GREENER_ALTERNATIVES",
    ...structured,
    aiMessage
  });
};

const explainProduct = async (message: string, res: Response) => {
  const product = await findProductFromMessage(message);

  if (!product)
    return res.json({
      intent: "PRODUCT_INFO",
      response: "I couldn't identify the product — try including its name 🙂"
    });

  const structured = {
    name: product.name,
    eco_score: product.eco_score,
    ai_label: product.ai_label,
    ai_confidence: product.ai_confidence,
    keywords: product.ai_keywords,
    breakdown: product.eco_breakdown
  };

  try {
    const aiMessage = await generateCopilotResponse(
      message,
      structured
    );
    return res.json({
      intent: "PRODUCT_INFO",
      product: structured,
      aiMessage
    });
  } catch (err) {
    return res.json({
      fallback: true,
      response: "I had trouble generating a response, but here are the results 🙂",
      structured
    });
  }
};
