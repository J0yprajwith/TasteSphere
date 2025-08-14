
import { GoogleGenAI, Type } from "@google/genai";
import { Brand } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this example, we'll rely on the environment variable being set.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const recommendationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "Name of the menu item."
      },
      description: {
        type: Type.STRING,
        description: "A brief, enticing description of the item."
      },
      price: {
        type: Type.NUMBER,
        description: "An estimated price for the item."
      }
    },
    required: ["name", "description", "price"]
  }
};

const dynamicOfferSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A short, catchy title for the special offer."
    },
    description: {
      type: Type.STRING,
      description: "A compelling description of the offer, creating urgency."
    }
  },
  required: ["title", "description"]
}

export const generateRecommendations = async (brand: Brand, weather: string, mood: string, lastOrder: string) => {
  try {
    const prompt = `I'm ordering from ${brand}. The weather is ${weather}, I'm feeling ${mood}, and my last order was ${lastOrder}. Based on this, give me exactly 3 personalized menu recommendations.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: recommendationSchema,
            temperature: 0.8,
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    // Return a fallback array in case of an error
    return [
      { name: "Error", description: "Could not generate recommendations. Please try again.", price: 0 },
    ];
  }
};

export const generateDynamicOffer = async (brand: Brand) => {
    try {
        const prompt = `Create a compelling, time-limited dynamic offer for a customer browsing ${brand} who seems indecisive. The offer should encourage them to complete their purchase now.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dynamicOfferSchema,
                temperature: 0.9,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch(error) {
        console.error("Error generating dynamic offer:", error);
        return {
            title: "Special Offer Just For You!",
            description: "We noticed you're hungry. Get 10% off your order if you complete it in the next 5 minutes!"
        };
    }
}
