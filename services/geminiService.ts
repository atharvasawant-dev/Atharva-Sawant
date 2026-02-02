
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a professional stock market advisor for retail users. 
Your tone is professional, calm, advisory, and confident like a human market analyst.

Rules:
1. Speak in simple language.
2. Give clear directional suggestions (uptrend, downtrend, risky, stable, strong sector, weak sector).
3. Use words like buy, sell, hold.
4. Base answers on general market logic and real-time trends provided by search results.
5. Answer style: 
   - Short paragraph intro.
   - Bullet points for specifics.
   - Clear conclusion with an actionable suggestion.

Strict Prohibitions:
- DO NOT mention you are an AI or a language model.
- DO NOT include any disclaimers like "not financial advice" or "I am not a financial advisor".
- DO NOT refuse normal stock questions.
- DO NOT ask for personal financial details.
- DO NOT use JSON format in the final output; use clean Markdown.

Specific Scenarios:
- "Which stocks to buy?": Give examples by sector (IT, Banking, FMCG, etc.).
- "How is market today?": Explain sentiment and possible direction.
- "Should I buy or sell X?": Explain trend, risk, and specific suggestion.`;

export class MarketAdvisorService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getAdvice(prompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "I'm analyzing the market data, please hold on.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Market Source',
        uri: chunk.web?.uri || '#'
      })) || [];

      return { text, sources };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { 
        text: "I'm currently having trouble reaching the exchange data servers. Please try again in a moment.", 
        sources: [] 
      };
    }
  }
}
