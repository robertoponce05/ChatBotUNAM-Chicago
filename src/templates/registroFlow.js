import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
const registro = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "registro.txt"),
  "utf-8"
);

const registroFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  console.log("Navega  registro");
  await ctxFn.flowDynamic([{ body: registro, delay: 800 }]);
  await ctxFn.flowDynamic([
    { body: "Si tienes más dudas, hazme una pregunta", delay: 4000 },
  ]);
  return ctxFn.endFlow(
    "O también puedes escribir *menú* para volver a comenzar."
  );
});

export { registroFlow };
