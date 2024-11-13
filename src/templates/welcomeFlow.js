import { addKeyword, EVENTS } from "@builderbot/bot";
import { menuFlow } from "./menuFlow.js";

const welcomeFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  await ctxFn.flowDynamic([
    {
      body: "Bienvenido al ChatBot de la UNAM Chicago. Por favor, escribe tu pregunta o duda",
      delay: 500,
    },
  ]);
  // await ctxFn.flowDynamic([{ body: "Selecciona una opción:", delay: 1000 }]);
  return ctxFn.gotoFlow(menuFlow);
});

export { welcomeFlow };
