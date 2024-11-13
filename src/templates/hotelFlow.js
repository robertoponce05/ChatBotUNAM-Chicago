import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
const hotel = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "hotel.txt"),
  "utf-8"
);
const hoteles = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "hoteles.txt"),
  "utf-8"
);

const hotelFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  console.log("Navega  hotel");
  await ctxFn.flowDynamic([{ body: hotel, delay: 800 }]);
  await ctxFn.flowDynamic([{ body: hoteles, delay: 4000 }]);
  await ctxFn.flowDynamic([
    { body: "Si tienes más dudas, hazme una pregunta", delay: 5000 },
  ]);
  return ctxFn.endFlow(
    "O también puedes escribir *menú* para volver a comenzar."
  );
});

export { hotelFlow };
