import OpenAI from "openai";
import { config } from "../config/index.js";

const openaiApiKey = config.openai_apiKey;
const model = config.model;

export const chat = async (prompt, question) => {
  try {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: question },
      ],
    });
    const answ = completion.choices[0].message.content;
    return answ;
  } catch (error) {
    console.error("Error al conectar con OPENAI: ", error);
    return "ERROR";
  }
};

export const chatHistory = async (prompt, messages) => {
  try {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: prompt },
        ...messages, //historial de conversaciones
      ],
    });
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error al conectar con OpenAI", error);
    return "ERROR";
  }
};
