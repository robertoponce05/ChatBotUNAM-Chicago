import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
const fechas = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "fechas.txt"),
  "utf-8"
);

const fechasFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  console.log("Navega  fechas");
  await ctxFn.flowDynamic([{ body: fechas, delay: 800 }]);
  await ctxFn.flowDynamic([
    { body: "Si tienes más dudas, hazme una pregunta", delay: 4000 },
  ]);
  return ctxFn.endFlow(
    "O también puedes escribir *menú* para volver a comenzar."
  );
});

export { fechasFlow };
