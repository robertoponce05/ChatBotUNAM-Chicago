import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const registro = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "registro.txt"),
  "utf-8"
);

const registroFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  try {
    console.log("Navega  registro");
    await ctxFn.flowDynamic([{ body: registro, delay: 800 }]);
    await ctxFn.flowDynamic([
      { body: "Si tienes más dudas, hazme una pregunta", delay: 800 },
    ]);
    await ctxFn.flowDynamic(
      "O también puedes escribir *menú* para volver a comenzar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  } catch (error) {
    console.log("Error en registroFlow: ", error);
  }
});

export { registroFlow };
