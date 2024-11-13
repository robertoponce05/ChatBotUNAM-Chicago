import { addKeyword, EVENTS } from "@builderbot/bot";

const byeFlow = addKeyword(["salir", "Salir", EVENTS.ACTION]).addAction(
  async (ctx, ctxFn) => {
    console.log("Cliente finaliza Chat");
    return ctxFn.endFlow(
      "Gracias por usar nuestro ChatBot. No dudes en regresar en caso de tener más dudas."
    );
  }
);

export { byeFlow };
