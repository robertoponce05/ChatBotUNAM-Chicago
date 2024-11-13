import { createFlowRouting } from "@builderbot-plugins/langchain";
import { EVENTS } from "@builderbot/bot";
import { config } from "../config/index.js";
import path from "path";
import fs from "fs";

import { gptFlow } from "./gptFlow.js";
import { welcomeFlow } from "./welcomeFlow.js";
import { byeFlow } from "./byeFlow.js";
import { mongoAdapter } from "../db/mongoAdapter.js";

const Prompt_DETECTED = path.join(
  process.cwd(),
  "assets/prompts",
  "prompt_Detection.txt"
);
const promptDetected = fs.readFileSync(Prompt_DETECTED, "utf8");

export const DetectIntention = createFlowRouting
  .setKeyword(EVENTS.ACTION)
  .setIntentions({
    intentions: ["SALUDO", "FAQ", "NO_DETECTED", "DESPEDIDA"],
    description: promptDetected,
  })
  .setAIModel({
    modelName: "openai",
    args: {
      modelName: config.model,
      apikey: config.openai_apiKey,
    },
  })
  .create({
    afterEnd(flow) {
      return flow.addAction(async (ctx, { state, endFlow, gotoFlow }) => {
        try {
          console.log(
            "INTENCION DETECTADA de : ",
            ctx.from,
            await state.get("intention"),
            "con MENSAJE: ",
            await ctx.body
          );
          const intention = await state.get("intention");

          if (intention == "NO_DETECTED" || intention == null) {
            const dbClient = await mongoAdapter.searchByMessageNumber(ctx.from);
            if (!dbClient) {
              console.log("Error: cliente no encontrado en la base de datos");
              return;
            }
            const newEntry = {
              UserQuestion: ctx.body,
              Intention: intention,
              date: new Date(), //current date
            };
            await mongoAdapter.addHistoryMessage(ctx.from, newEntry);
            console.log(
              "Nuevo registro: ",
              ctx.from,
              " ",
              intention,
              " ",
              ctx.body
            );

            return endFlow(
              "No entendí tu pregunta, por favor podrías repetirla más claramente."
            );
          }
          if (intention == "SALUDO") {
            return gotoFlow(welcomeFlow);
          }
          if (intention == "FAQ") {
            return gotoFlow(gptFlow);
          }
          if (intention == "DESPEDIDA") {
            return gotoFlow(byeFlow);
          }
        } catch (error) {
          console.error("Error en DetectIntention: ", error);
        }
      });
    },
  });
