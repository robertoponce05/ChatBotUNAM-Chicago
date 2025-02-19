import { addKeyword, EVENTS } from "@builderbot/bot";
import { DetectIntention } from "./intentionsFlow.js";
import { mongoAdapter } from "../db/mongoAdapter.js";
import { byeFlow } from "./byeFlow.js";

const mainFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
  try {
    const dbClient = await mongoAdapter.searchByCustomerNumber(ctx.from);
    const dbMessages = await mongoAdapter.searchByMessageNumber(ctx.from);
    if (dbClient == null) {
      await mongoAdapter.addOrUpdateClient({
        name: ctx.name,
        number: ctx.from,
        history: [],
      });
    }
    if (dbMessages == null) {
      await mongoAdapter.addOrUpdateMessage({
        number: ctx.from,
        history: [],
      });
    }
    console.log("Comienza flujo de ", ctx.from);
    setTimeout(async () => {
      console.log("Sesión expirada para ", ctx.from);
      await ctxFn.gotoFlow(byeFlow);
    }, 300000);
    return ctxFn.gotoFlow(DetectIntention);
  } catch (error) {
    console.log("Error en mainflow", error);
  }
});

export { mainFlow };
