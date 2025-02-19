import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const fechas = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "fechas.txt"),
  "utf-8"
);
const fechasPP = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "fechasPP.txt"),
  "utf-8"
);

const fechasFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  try {
    console.log("Navega  fechas");
    await ctxFn.flowDynamic([{ body: fechas, delay: 800 }]);
    await ctxFn.flowDynamic([{ body: fechasPP, delay: 800 }]);
    await ctxFn.flowDynamic(
      "Escribe  *menú* para regresar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  } catch (error) {
    console.log("Error en fechasFlow: ", error);
  }
});

export { fechasFlow };
