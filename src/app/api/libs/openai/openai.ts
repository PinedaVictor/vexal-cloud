import OpenAI from "openai";

const initOpenAI = (apiKey: string) => {
  return new OpenAI({
    apiKey: apiKey,
  });
};

export const generateResponse = async (apiKey: string, prompt: string) => {
  const openai = initOpenAI(apiKey);
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  const aiResponse = chatCompletion.choices[0].message;
  console.log("THis is the generated reponse:", aiResponse);
  return aiResponse;
};
