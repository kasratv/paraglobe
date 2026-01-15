
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateStrategicVision = async (industry: string, scale: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a high-level strategic vision for an organization in the ${industry} industry with a ${scale} scale operation. 
      The tone should be confident, technical, and visionary. 
      Focus on the intersection of AI integration and scalable web infrastructure. 
      Format: Return as clean Markdown. No fluff.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "Vision could not be synthesized at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
