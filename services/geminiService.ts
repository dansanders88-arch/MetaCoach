import { GoogleGenAI, Type } from "@google/genai";
import { TrainingTask } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTrainingPlan = async (
  game: string,
  currentRank: string,
  targetRank: string,
  weaknesses: string
): Promise<TrainingTask[]> => {
  
  if (!apiKey) {
    console.warn("No API Key provided. Returning mock data.");
    return [
      { day: "Day 1", title: "Mechanics Warmup", description: "30 mins aimed at head-level tracking.", duration: "30m" },
      { day: "Day 2", title: "VOD Review", description: "Analyze 2 losses from yesterday.", duration: "45m" }
    ];
  }

  const prompt = `
    You are an elite esports coach for ${game}.
    Create a 3-day high-intensity training routine for a player currently at ${currentRank} rank trying to reach ${targetRank}.
    Their specific weakness is: ${weaknesses}.
    
    Return a list of specific drills/tasks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              duration: { type: Type.STRING },
            },
            required: ["day", "title", "description", "duration"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as TrainingTask[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate training plan.");
  }
};
