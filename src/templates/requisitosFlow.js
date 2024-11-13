import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
const requisitos = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "requisitos.txt"),
  "utf-8"
);

const requisitosFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, ctxFn) => {
    console.log("Navega  requisitos");
    await ctxFn.flowDynamic([{ body: requisitos, delay: 800 }]);
    await ctxFn.flowDynamic([
      { body: "Si tienes más dudas, hazme una pregunta", delay: 4000 },
    ]);
    return ctxFn.endFlow(
      "O también puedes escribir *menú* para volver a comenzar."
    );
  }
);

export { requisitosFlow };
