import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    brandName: { type: Type.STRING, description: "Il nome del brand analizzato" },
    totalReviewsAnalyzed: { type: Type.INTEGER, description: "Numero approssimativo di recensioni analizzate" },
    averageSentiment: { type: Type.NUMBER, description: "Punteggio sentiment medio da 0 a 100" },
    summary: { type: Type.STRING, description: "Un breve riassunto esecutivo in italiano" },
    swot: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Punti di forza ricorrenti" },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Punti di debolezza ricorrenti" },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Opportunità di miglioramento suggerite dai dati" },
        threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Criticità gravi o minacce per il business" },
      },
      required: ["strengths", "weaknesses", "opportunities", "threats"],
    },
    regionalInsights: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          region: { type: Type.STRING, description: "Città o Regione identificata" },
          sentimentScore: { type: Type.NUMBER, description: "Sentiment locale 0-100" },
          keyIssue: { type: Type.STRING, description: "Problema principale in questa zona" },
          keyStrength: { type: Type.STRING, description: "Punto di forza in questa zona" },
        },
      },
    },
  },
  required: ["brandName", "totalReviewsAnalyzed", "averageSentiment", "swot", "regionalInsights", "summary"],
};

export const analyzeReviews = async (reviewsText: string, brandName: string): Promise<AnalysisResult> => {
  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Sei un esperto analista di business e retail.
      Analizza le seguenti recensioni per la catena di negozi "${brandName}".
      
      Il tuo compito è creare una matrice SWOT (Punti di Forza, Debolezza, Opportunità, Minacce/Criticità) basata su queste recensioni.
      Inoltre, se le recensioni menzionano città o luoghi specifici, estrapola insight regionali.
      
      Recensioni da analizzare:
      """
      ${reviewsText}
      """
      
      Rispondi ESCLUSIVAMENTE con un oggetto JSON conforme allo schema fornito.
      Assicurati che l'output sia in lingua Italiana professionale.
    `;

    const result = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3, // Low temperature for more analytical/consistent results
      },
    });

    if (!result.text) {
      throw new Error("Nessuna risposta generata dal modello.");
    }

    const data = JSON.parse(result.text) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Errore durante l'analisi Gemini:", error);
    throw error;
  }
};