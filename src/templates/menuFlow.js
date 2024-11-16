import { addKeyword } from "@builderbot/bot";
import path from "path";
import fs from "fs";
import { handlerMenu } from "./handlerMenu.js";
const menuText = path.join(process.cwd(), "assets/messages", "menu.txt");
const menu = fs.readFileSync(menuText, "utf8");

const menuFlow = addKeyword(["Menu", "Menú", "menu", "menú"]).addAction(
  async (ctx, ctxFn) => {
    await ctxFn.flowDynamic(menu);
    return ctxFn.gotoFlow(handlerMenu);
  }
);

export { menuFlow };
