import { addKeyword } from "@builderbot/bot";
import { flowInfo } from "./flowInfo.js";
import { descuentosFlow } from "./descuentosFlow.js";
import { requisitosFlow } from "./requisitosFlow.js";
import { fechasFlow } from "./fechasFlow.js";
import { registroFlow } from "./registroFlow.js";
import { hotelFlow } from "./hotelFlow.js";
import { DetectIntention } from "./intentionsFlow.js";
import { EVENTS } from "@builderbot/bot";
import { menuFlow } from "./menuFlow.js";

const handlerMenu = addKeyword(EVENTS.ACTION)
  .addAction({ capture: true })
  .addAction(async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
    try {
      console.error("entra HandlerMenu con captura: ", ctx.body);
      const userInput = ctx.body.toLowerCase();
      if (
        !["1", "2", "3", "4", "5", "6", "0", "salir", "menu", "menú"].includes(
          userInput
        )
      ) {
        return gotoFlow(DetectIntention);
      }
      switch (userInput) {
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
          return await flowDynamic(
            "Saliendo... Puedes volver a ingresar diciéndome '*Hola*'"
          );
        case "menu":
        case "menú":
          return gotoFlow(menuFlow);
        default:
          // Este caso no debería ser necesario debido a la validación anterior
          return;
      }
    } catch (error) {
      console.error("Error en handlerMenu:", error);
      return fallBack("Ocurrió un error. Por favor, intenta de nuevo.");
    }
  });

export { handlerMenu };
