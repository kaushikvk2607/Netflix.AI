import { GoogleGenAI } from '@google/genai';
const { VITE_GEMINI_API_KEY } = import.meta.env;


const ai = new GoogleGenAI({ apiKey: VITE_GEMINI_API_KEY });


export const geminiResults = async (prompt) => {

    const query = "Act as movie recomendation system and suggest some movies for the query :" + prompt + ", only give five names of movies, comma seperated like the example result given ahead. result: Gadar, Sholay, Don, Golmal, Koi Mil Gaya  "
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
        });
        return response.text
    } catch (error) {
        return "Error Generating Response"
    }
}

