import { addKeyword } from "@builderbot/bot";
import { flowInfo } from "./flowInfo.js";
import path from "path";
import fs from "fs";
import { descuentosFlow } from "./descuentosFlow.js";
import { requisitosFlow } from "./requisitosFlow.js";
import { fechasFlow } from "./fechasFlow.js";
import { registroFlow } from "./registroFlow.js";
import { hotelFlow } from "./hotelFlow.js";
import { DetectIntention } from "./intentionsFlow.js";
const menuText = path.join(process.cwd(), "assets/messages", "menu.txt");
const menu = fs.readFileSync(menuText, "utf8");

const menuFlow = addKeyword(["Menu", "Menú", "menu", "menú"]).addAnswer(
  menu,
  { delay: 700, capture: true },
  async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
    try {
      if (
        !["1", "2", "3", "4", "5", "6", "0", "salir", "Salir"].includes(
          ctx.body
        )
      ) {
        // return fallBack("Respuesta no válida, selecciona una válida.");
        return gotoFlow(DetectIntention);
      }
      switch (ctx.body) {
        case "1":
          return gotoFlow(flowInfo);
        case "2":
          return gotoFlow(descuentosFlow);
        case "3":
          return gotoFlow(requisitosFlow);
        case "4":
          return gotoFlow(fechasFlow);
        case "5":
          return gotoFlow(registroFlow);
        case "6":
          return gotoFlow(hotelFlow);
        case "0":
        case "salir":
        case "Salir":
          return await flowDynamic(
            "Saliendo... Puedes volver a ingresar diciéndome '*Hola*'"
          );
        default:
          // Este caso no debería ser necesario debido a la validación anterior
          return ctx.body;
      }
    } catch (error) {
      console.error("Error en menuFlow:", error);
      return fallBack("Ocurrió un error. Por favor, intenta de nuevo.");
    }
  }
);

export { menuFlow };
