import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);

export async function generateGeminiContent(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
 // ✅ FIXED MODEL NAME

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}
