import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const infoPath = path.join(process.cwd(), "assets/messages", "info.txt");
const infoText = fs.readFileSync(infoPath, "utf8");
const imgPath = path.join(process.cwd(), "assets/media", "curso.jpeg");
const costos = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "costos.txt"),
  "utf-8"
);

const flowInfo = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  try {
    console.log("Navega a Información");
    await ctxFn.flowDynamic([{ media: imgPath, delay: 100 }]);
    await ctxFn.flowDynamic([{ body: infoText, delay: 200 }]);
    await ctxFn.flowDynamic([{ body: costos, delay: 200 }]);
    await ctxFn.flowDynamic(
      "Escribe  *menú* para regresar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  } catch (error) {
    console.log("Error en flowInfo: ", error);
  }
});

export { flowInfo };
