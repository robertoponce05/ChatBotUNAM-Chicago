import { addKeyword, EVENTS } from "@builderbot/bot";
import { DetectIntention } from "./intentionsFlow.js";
import { mongoAdapter } from "../db/mongoAdapter.js";

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
    return ctxFn.gotoFlow(DetectIntention);
  } catch (error) {
    console.log("Error en mainflow", error);
  }
});

export { mainFlow };
