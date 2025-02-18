import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const requisitos = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "requisitos.txt"),
  "utf-8"
);

const requisitosFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, ctxFn) => {
    try {
      console.log("Navega  requisitos");
      await ctxFn.flowDynamic([{ body: requisitos, delay: 500 }]);

      await ctxFn.flowDynamic(
        "Escribe  *menú* para regresar."
      );
      return ctxFn.gotoFlow(handlerMenu);
    } catch (error) {
      console.log("Error en requisitosFlow: ", error);
    }
  }
);

export { requisitosFlow };
