
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the Elite Real Estate Concierge for Becky Maldeney in Auburn, Indiana. 
Becky is the premier luxury broker at Indiana Real Estate Inc.

TONE:
- Sophisticated, concise, and editorial. Use high-end architectural language.
- Never say "I can help with that," instead say "I will facilitate that for you."
- Local expertise focus: DeKalb County, Bridgewater Golf Community, Watson Estates.

CONTEXT:
- Auburn's heritage (automotive history) and quiet luxury.
- Emphasize private tours and high-net-worth discretion.`;

export async function getPropertyAssistantResponse(query: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Assistant Failure:", error);
    return "I apologize, my link to the luxury records is temporarily unavailable. Please contact Becky directly at +1 260-570-5894 for immediate concierge service.";
  }
}
