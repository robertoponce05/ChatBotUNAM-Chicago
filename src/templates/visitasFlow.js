import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const visitas = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "visitas.txt"),
  "utf-8"
);
const costos = fs.readFileSync(
    path.join(process.cwd(), "assets/messages", "costosPP.txt"),
    "utf-8"
  );
const imgPath = path.join(process.cwd(), "assets/media", "curso.jpeg");


const visitasFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, ctxFn) => {
    try {
        console.log("Navega a Visitas");
        await ctxFn.flowDynamic([{ media: imgPath, delay: 800 }]);
        await ctxFn.flowDynamic([{ body: visitas, delay: 800 }]);
        await ctxFn.flowDynamic([{ body: costos, delay: 800 }]);

        await ctxFn.flowDynamic(
            [{ body: "Escribe  *menú* para regresar.", delay: 1000 }]
        );
        return ctxFn.gotoFlow(handlerMenu);
    } catch (error) {
      console.log("Error en visitas: ", error);
    }
  }
);

export { visitasFlow };
