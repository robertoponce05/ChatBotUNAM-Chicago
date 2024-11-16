import { addKeyword, EVENTS } from "@builderbot/bot";

const byeFlow = addKeyword(["salir", "Salir", EVENTS.ACTION]).addAction(
  async (ctx, ctxFn) => {
    try {
      console.log("Cliente finaliza Chat");
      ctxFn.flowDynamic("Gracias por usar nuestro ChatBot 🤖");
      return ctxFn.endFlow(
        "No dudes en regresar en caso de tener más preguntas."
      );
    } catch (error) {
      console.log("Error en byeFlow: ", error);
    }
  }
);

export { byeFlow };
