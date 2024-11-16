import { addKeyword, EVENTS } from "@builderbot/bot";
import { chatHistory } from "../services/chatgpt.js";
import { mongoAdapter } from "../db/mongoAdapter.js";

import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";

const prompt_Bot = path.join(process.cwd(), "assets/prompts", "prompt_Bot.txt");
const prompt_B = fs.readFileSync(prompt_Bot, "utf8");

const gptFlow = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, ctxFn) => {
    const dbClient = await mongoAdapter.searchByCustomerNumber(ctx.from);
    if (!dbClient) {
      console.log("Error: cliente no encontrado en la base de datos");
      return;
    }
    //Obtener el historial completo del cliente
    const history = dbClient.history || [];

    //Mantener solo los últimos 3 pares de preguntas/respuestas de la IA.
    const limitedHistory = history.slice(-3).flatMap((item) => [
      { role: "user", content: item.question },
      { role: "assistant", content: item.answer },
    ]);

    //Agregar el mensaje actual del cliente como la última entrada de user
    const currentMessage = { role: "user", content: ctx.body };
    const messagesForAI = [...limitedHistory, currentMessage];

    //Generar la respuesta con el historial reducido

    const response = await chatHistory(prompt_B, messagesForAI);
    const cleanedResponse = response.trim();

    //Enviar respuesta al usuario
    console.log("Bot responde FAQ: ", cleanedResponse);
    await ctxFn.flowDynamic(cleanedResponse);

    //Agregar la nueva pregunta/respuesta al historial con fecha actual
    const newEntry = {
      question: ctx.body,
      answer: cleanedResponse,
      date: new Date(), //current date
    };
    await mongoAdapter.addHistory(ctx.from, newEntry);
  })
  .addAction(async (ctx, ctxFn) => {
    await ctxFn.flowDynamic([
      { body: "Si tienes más dudas, hazme una pregunta", delay: 1000 },
    ]);
    await ctxFn.flowDynamic(
      "Dime *menú* para volver a comenzar. Escribe *salir* para terminar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  });

export { gptFlow };
