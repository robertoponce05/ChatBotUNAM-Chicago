import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const registro = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "registro.txt"),
  "utf-8"
);
const imgPath = path.join(process.cwd(), "assets/media", "curso.jpeg");

const registroFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  try {
    console.log("Navega  registro");
    await ctxFn.flowDynamic([{ media: imgPath, delay: 200 }]);
    await ctxFn.flowDynamic([{ body: registro, delay: 200 }]);

    await ctxFn.flowDynamic(
      "Escribe  *menú* para regresar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  } catch (error) {
    console.log("Error en registroFlow: ", error);
  }
});

export { registroFlow };
