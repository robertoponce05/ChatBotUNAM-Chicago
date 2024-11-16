import { createFlow } from "@builderbot/bot";
import { welcomeFlow } from "./welcomeFlow.js";
import { gptFlow } from "./gptFlow.js";
import { mainFlow } from "./mainFlow.js";
import { DetectIntention } from "./intentionsFlow.js";
import { byeFlow } from "./byeFlow.js";
import { menuFlow } from "./menuFlow.js";
import { flowInfo } from "./flowInfo.js";
import { descuentosFlow } from "./descuentosFlow.js";
import { requisitosFlow } from "./requisitosFlow.js";
import { fechasFlow } from "./fechasFlow.js";
import { hotelFlow } from "./hotelFlow.js";
import { registroFlow } from "./registroFlow.js";
import { handlerMenu } from "./handlerMenu.js";

export default createFlow([
  welcomeFlow,
  gptFlow,
  mainFlow,
  DetectIntention,
  byeFlow,
  menuFlow,
  flowInfo,
  descuentosFlow,
  requisitosFlow,
  fechasFlow,
  registroFlow,
  hotelFlow,
  handlerMenu,
]);
