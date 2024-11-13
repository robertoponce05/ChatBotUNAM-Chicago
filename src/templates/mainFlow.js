import { addKeyword, EVENTS } from "@builderbot/bot";
import { DetectIntention } from "./intentionsFlow.js";
import { mongoAdapter } from "../db/mongoAdapter.js";

const mainFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
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
  return ctxFn.gotoFlow(DetectIntention);
});

export { mainFlow };
