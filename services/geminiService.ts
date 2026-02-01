
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Document } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAnalyticResponse = async (
  prompt: string, 
  documents: Document[],
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  // Create a context from the library
  const context = documents.map(doc => 
    `[${doc.sourceType}] ${doc.title} (${doc.type}): ${doc.content}`
  ).join('\n\n');

  const systemInstruction = `
    You are an expert Patent Analyst and Academic Researcher. 
    You have access to a library of INTERNAL and EXTERNAL documents.
    Your goal is to cross-reference user queries with this knowledge base.
    
    LIBRARY CONTEXT:
    ${context}

    When answering, distinguish between internal and external sources.
    Be precise, professional, and analytical. Use Markdown for formatting.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { 
        parts: [
          { text: prompt }
        ] 
      },
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the AI. Please try again later.";
  }
};
