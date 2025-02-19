import { addKeyword, EVENTS } from "@builderbot/bot";
import { DetectIntention } from "./intentionsFlow.js";
import { mongoAdapter } from "../db/mongoAdapter.js";
import { byeFlow } from "./byeFlow.js";

let sessionTimers = {};

const resetSessionTimer = async (ctx, ctxFn) => {
  if (sessionTimers[ctx.from]) {
    console.log("Sesión renovada para ", ctx.from);
    clearTimeout(sessionTimers[ctx.from]);
  }
  sessionTimers[ctx.from] = setTimeout(async () => {
    console.log("Sesión expirada para ", ctx.from);
    await ctxFn.gotoFlow(byeFlow);
  }, 20000);
};

const clearSessionTimer = (ctx) => {
  if (sessionTimers[ctx.from]) {
    clearTimeout(sessionTimers[ctx.from]);
    delete sessionTimers[ctx.from];
    console.log("Sesión expirada para ", ctx.from);
  }
};

const mainFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
  try {
    await resetSessionTimer(ctx, ctxFn);

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

export { mainFlow, resetSessionTimer, clearSessionTimer };
