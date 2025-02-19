import { addKeyword, EVENTS } from "@builderbot/bot";

const byeFlow = addKeyword(["salir", "Salir", EVENTS.ACTION]).addAction(
  async (ctx, ctxFn) => {
    try {
      console.log("Cliente finaliza Chat");
      ctxFn.flowDynamic("Gracias por usar nuestro ChatBot 🤖");
      return ctxFn.endFlow(
        "Si tienes alguna otra duda, te respondemos personalmente en nuestro grupo de WhatsApp 📲 https://chat.whatsapp.com/JKrVWZqhvyVGVaiQZWuGHK"
      );
    } catch (error) {
      console.log("Error en byeFlow: ", error);
    }
  }
);

export { byeFlow };
