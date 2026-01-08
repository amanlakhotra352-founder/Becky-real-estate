
import { GoogleGenAI } from "@google/genai";

export async function getPropertyAssistantResponse(query: string, context?: string) {
  // Always create a new GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      // Simple string for the user query
      contents: query,
      config: {
        // Use systemInstruction for specialized model behavior
        systemInstruction: `You are the Elite Real Estate Concierge for Becky Maldeney in Auburn, Indiana. 
          Becky is the premier luxury broker at Indiana Real Estate Inc.
          
          TONE:
          - Sophisticated, concise, and editorial.
          - Use high-end architectural and lifestyle language.
          - Never say "I can help with that," instead say "I will facilitate that for you."
          - Deeply local to Auburn and DeKalb County.
          
          MARKET KNOWLEDGE:
          - Focus: Bridgewater Golf Community (villas), Watson Estates, Greyson Heights, Rotondo Estates.
          - Heritage: Auburn is known for its automotive history (Cord Duesenberg). Mention local charm.`,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    // Access the .text property directly (it's a getter, not a method)
    return response.text;
  } catch (error) {
    console.error("Assistant Connection Error:", error);
    return "I apologize, my data uplink to the Auburn luxury records is momentarily interrupted. Please contact Becky Maldeney directly at +1 260-570-5894.";
  }
}
