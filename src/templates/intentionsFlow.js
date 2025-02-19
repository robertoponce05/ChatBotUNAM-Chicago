import { createFlowRouting } from "@builderbot-plugins/langchain";
import { EVENTS } from "@builderbot/bot";
import { config } from "../config/index.js";
import path from "path";
import fs from "fs";
import { descuentosFlow } from "./descuentosFlow.js";
import { requisitosFlow } from "./requisitosFlow.js";
import { fechasFlow } from "./fechasFlow.js";
import { registroFlow } from "./registroFlow.js";
import { hotelFlow } from "./hotelFlow.js";
import { flowInfo } from "./flowInfo.js";
import { welcomeFlow } from "./welcomeFlow.js";
import { visitasFlow } from "./visitasFlow.js";
import { byeFlow } from "./byeFlow.js";
import { mongoAdapter } from "../db/mongoAdapter.js";
import { handlerMenu } from "./handlerMenu.js";
import { clearSessionTimer } from "./mainFlow.js";
const Prompt_DETECTED = path.join(
  process.cwd(),
  "assets/prompts",
  "prompt_Detection.txt"
);
const promptDetected = fs.readFileSync(Prompt_DETECTED, "utf8");

export const DetectIntention = createFlowRouting
  .setKeyword(EVENTS.ACTION)
  .setIntentions({
    intentions: [
      "SALUDO",
      "infoFlow",
      "descuentosFlow",
      "requisitosFlow",
      "fechasFlow",
      "registroFlow",
      "hotelFlow",
      "DESPEDIDA"
    ],
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
      return flow.addAction(async (ctx, { state, gotoFlow, flowDynamic }) => {
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
            await flowDynamic("No entendí tu pregunta 😅");
            await flowDynamic("Para regresar escribe *menú* ");
            return gotoFlow(handlerMenu);
          }
          if (intention == "SALUDO") {
            return gotoFlow(welcomeFlow);
          }
          if (intention == "infoFlow") {
            return gotoFlow(flowInfo);
          }
          if (intention == "visitasFlow") {
            return gotoFlow(visitasFlow);
          }
          if (intention == "descuentosFlow") {
            return gotoFlow(descuentosFlow);
          }
          
          if (intention == "requisitosFlow") {
              return gotoFlow(requisitosFlow);
          }
          
          if (intention == "fechasFlow") {
              return gotoFlow(fechasFlow);
          }
          
          if (intention == "registroFlow") {
              return gotoFlow(registroFlow);
          }
          
          if (intention == "hotelFlow") {
            return gotoFlow(hotelFlow);
          }
          if (intention == "DESPEDIDA") {
            clearSessionTimer(ctx);
            return gotoFlow(byeFlow);
          }
        } catch (error) {
          console.error("Error en DetectIntention: ", error);
        }
      });
    },
  });
