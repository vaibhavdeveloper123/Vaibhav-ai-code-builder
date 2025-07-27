import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent({
      contents: [{
        parts: [{ 
          text: `Generate clean, functional code for: "${prompt}". 
                 Provide ONLY the raw code without explanations.`
        }]
      }]
    });

    const response = await result.response;
    res.status(200).json({ code: response.text() });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
