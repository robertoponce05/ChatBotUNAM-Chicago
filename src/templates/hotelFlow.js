import { addKeyword, EVENTS } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const hotel = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "hotel.txt"),
  "utf-8"
);
const hoteles = fs.readFileSync(
  path.join(process.cwd(), "assets/messages", "hoteles.txt"),
  "utf-8"
);

const hotelFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {
  try {
    console.log("Navega  hotel");
    await ctxFn.flowDynamic([{ body: hotel, delay: 800 }]);
    await ctxFn.flowDynamic([{ body: hoteles, delay: 1000 }]);

    await ctxFn.flowDynamic(
      "Escribe  *menú* para regresar."
    );
    return ctxFn.gotoFlow(handlerMenu);
  } catch (error) {
    console.log("Error en hotelFlow: ", error);
  }
});

export { hotelFlow };
