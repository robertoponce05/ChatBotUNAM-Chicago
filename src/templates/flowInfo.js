import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const infoPath = path.join(process.cwd(), "assets/messages", "info.txt");
const infoText = fs.readFileSync(infoPath, "utf8");
const imgPath = path.join(process.cwd(), "assets/media", "curso.jpg");
const costos = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "costos.txt"),
  "utf-8"
);

const flowInfo = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  try {
    console.log("Navega a Información");
    await ctxFn.flowDynamic([{ media: imgPath, delay: 800 }]);
    await ctxFn.flowDynamic([{ body: infoText, delay: 1000 }]);
    await ctxFn.flowDynamic([{ body: costos, delay: 1000 }]);
    await ctxFn.flowDynamic([
      { body: "Si tienes más dudas, hazme una pregunta", delay: 1000 },
    ]);
    await ctxFn.flowDynamic(
      "O también puedes escribir *menú* para volver a comenzar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  } catch (error) {
    console.log("Error en flowInfo: ", error);
  }
});

export { flowInfo };
