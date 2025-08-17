import { GoogleGenAI, Type } from "@google/genai";
import { CarePlan, Diagnosis, EncyclopediaPlant, Language, WeatherData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const languageMap: Record<Language, string> = {
  pt: 'Portuguese (Brazil)',
  en: 'English',
  es: 'Spanish'
};

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export async function identifyPlant(imageBase64: string, mimeType: string, language: Language): Promise<{ commonName: string; scientificName: string }> {
  try {
    const imagePart = fileToGenerativePart(imageBase64, mimeType);
    const langName = languageMap[language];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          imagePart,
          { text: `Identify the plant in this image. Provide its common name in ${langName} and its scientific name. Respond in JSON.` }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            commonName: { type: Type.STRING, description: `The common name of the plant in ${langName}.` },
            scientificName: { type: Type.STRING, description: "The scientific name of the plant." },
          },
          required: ["commonName", "scientificName"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error identifying plant:", error);
    const errorMessages: Record<Language, string> = {
      pt: "Não foi possível identificar a planta. Tente uma foto mais nítida.",
      en: "Could not identify the plant. Try a clearer photo.",
      es: "No se pudo identificar la planta. Intenta con una foto más clara.",
    };
    throw new Error(errorMessages[language]);
  }
}

export async function generateCarePlan(scientificName: string, location: string, language: Language, weatherData: WeatherData | null): Promise<CarePlan> {
    try {
        const langName = languageMap[language];
        let prompt = `Generate a detailed care plan in ${langName} for a '${scientificName}' located in a '${location}'. Provide: watering frequency in days, a short description of seasonal watering changes (summer vs winter), fertilizing frequency in months, a short description of seasonal fertilizing changes, brief info on pruning needs, brief info on rotating the plant, and one short, helpful tip.`;

        if (weatherData) {
            prompt += ` CONTEXT: The user is in ${weatherData.city}, where the current temperature is ${weatherData.temperature}°C, humidity is ${weatherData.humidity}%, and it is currently ${weatherData.season}. Please tailor the care advice, especially watering frequency, to these specific conditions.`;
        }

        prompt += " Respond in JSON.";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        wateringDays: { type: Type.NUMBER, description: "Average number of days between waterings." },
                        wateringSeasonality: { type: Type.STRING, description: "Seasonal watering advice." },
                        fertilizingMonths: { type: Type.NUMBER, description: "Average number of months between fertilizing." },
                        fertilizingSeasonality: { type: Type.STRING, description: "Seasonal fertilizing advice." },
                        pruningInfo: { type: Type.STRING, description: "Brief pruning information." },
                        rotatingInfo: { type: Type.STRING, description: "Brief plant rotation information." },
                        tip: { type: Type.STRING, description: "A single, short care tip, potentially related to the current weather." },
                    },
                    required: ["wateringDays", "wateringSeasonality", "fertilizingMonths", "fertilizingSeasonality", "pruningInfo", "rotatingInfo", "tip"],
                },
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating care plan:", error);
        const errorMessages: Record<Language, string> = {
          pt: "Não foi possível gerar um plano de cuidados para esta planta.",
          en: "Could not generate a care plan for this plant.",
      es: "No se pudo generar un plan de cuidados para esta planta.",
    };
    throw new Error(errorMessages[language]);
    }
}


export async function diagnosePlantProblem(imageBase64: string, mimeType: string, language: Language, weatherData: WeatherData | null): Promise<Diagnosis> {
  try {
    const imagePart = fileToGenerativePart(imageBase64, mimeType);
    const langName = languageMap[language];
    let prompt = `Analyze the plant in this image. It seems to have a problem. Identify potential issues like diseases, pests, or nutrient deficiencies. Provide a clear diagnosis and a simple, step-by-step treatment plan for a home gardener.`;
    
    if (weatherData) {
        prompt += ` CONTEXT: The user is in ${weatherData.city}, where the current temperature is ${weatherData.temperature}°C and humidity is ${weatherData.humidity}%. This information can be crucial for diagnosis (e.g., high humidity suggests fungal issues). Please consider this in your diagnosis and treatment plan.`;
    }
    
    prompt += ` Respond in ${langName} in JSON format.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
            imagePart,
            { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING, description: "A concise diagnosis of the plant's problem." },
            treatmentPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of steps to treat the plant.",
            },
          },
          required: ["diagnosis", "treatmentPlan"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error diagnosing plant:", error);
    const errorMessages: Record<Language, string> = {
      pt: "Não foi possível diagnosticar o problema. Por favor, tente outra imagem.",
      en: "Could not diagnose the problem. Please try another image.",
      es: "No se pudo diagnosticar el problema. Por favor, intente con otra imagen.",
    };
    throw new Error(errorMessages[language]);
  }
}

export async function getEncyclopediaPlantDetails(plantName: string, language: Language): Promise<EncyclopediaPlant> {
  try {
    const langName = languageMap[language];
    const prompt = `Provide a detailed encyclopedia entry in ${langName} for the plant '${plantName}'. Include: common name (in ${langName}), scientific name, a brief description, ideal light conditions, ideal humidity, suggested soil type, toxicity information for pets/children, and a fun fact. Respond in JSON.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            commonName: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            description: { type: Type.STRING },
            light: { type: Type.STRING },
            humidity: { type: Type.STRING },
            soil: { type: Type.STRING },
            isToxic: { type: Type.BOOLEAN },
            funFact: { type: Type.STRING },
          },
          required: ["commonName", "scientificName", "description", "light", "humidity", "soil", "isToxic", "funFact"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error fetching encyclopedia data:", error);
     const errorMessages: Record<Language, string> = {
      pt: "Não foi possível encontrar informações sobre esta planta.",
      en: "Could not find information about this plant.",
      es: "No se pudo encontrar información sobre esta planta.",
    };
    throw new Error(errorMessages[language]);
  }
}