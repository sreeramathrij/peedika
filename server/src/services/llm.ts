import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateCopilotResponse = async (
  userMessage: string,
  structuredContext: any
) => {
  const systemPrompt = `
You are an eco-shopping sustainability assistant inside a web app.
Your job is to help users choose greener products in a positive, supportive tone.

Rules:
- Only use the product data provided in the context.
- Do NOT invent facts or product details.
- Explain sustainability in simple, friendly language.
- Encourage — never shame.
- Keep responses concise but helpful.
- If unsure, ask a clarification question.

You can reference:
eco score, materials, alternatives, impact, price, keywords.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `
User message:
${userMessage}

Context data (JSON):
${JSON.stringify(structuredContext, null, 2)}
        `
      }
    ],
    temperature: 0.5
  });

  return response.choices[0]?.message?.content ?? "Unable to generate response.";
};
