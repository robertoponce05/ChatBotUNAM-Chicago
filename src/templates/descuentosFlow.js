import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const descuentos = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "descuentos.txt"),
  "utf-8"
);

const descuentosFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, ctxFn) => {
    try {
      console.log("Navega a Descuentos");

      await ctxFn.flowDynamic([{ body: descuentos, delay: 800 }]);

      await ctxFn.flowDynamic(
        "Escribe  *menú* para regresar."
      );
      return ctxFn.gotoFlow(handlerMenu);
    } catch (error) {
      console.log("Error en descuentos: ", error);
    }
  }
);

export { descuentosFlow };
