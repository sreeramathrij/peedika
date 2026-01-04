export type Intent =
  | "PRODUCT_INFO"
  | "RECOMMEND"
  | "CART_EVAL"
  | "GREENER_ALTERNATIVES"
  | "FAQ"
  | "UNKNOWN";

export const detectIntent = (message: string): Intent => {
  const m = message.toLowerCase();

  if (m.includes("cart") && (m.includes("eco") || m.includes("score")))
    return "CART_EVAL";

  if (m.includes("alternative") || m.includes("greener"))
    return "GREENER_ALTERNATIVES";

  if (m.includes("recommend") || m.includes("show me") || m.includes("find"))
    return "RECOMMEND";

  if (m.includes("why") || m.includes("explain"))
    return "PRODUCT_INFO";

  if (m.includes("sustainable") || m.includes("eco friendly"))
    return "FAQ";

  return "UNKNOWN";
};
