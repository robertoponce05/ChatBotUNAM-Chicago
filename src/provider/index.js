import { createProvider } from "@builderbot/bot";
import { MetaProvider } from "@builderbot/provider-meta";
import { BaileysProvider } from "@builderbot/provider-baileys";
import { TwilioProvider } from "@builderbot/provider-twilio";
import { config } from "../config/index.js";

const providerMeta = createProvider(MetaProvider, {
  jwtToken: config.jwtToken,
  numberId: config.numberId,
  verifyToken: config.verifyToken,
  version: config.version,
});

const providerBaileys = createProvider(BaileysProvider);

const providerTwilio = createProvider(TwilioProvider, {
  accountSid: process.env.ACC_SID,
  authToken: process.env.ACC_TOKEN,
  vendorNumber: process.env.ACC_VENDOR,
});

export { providerMeta, providerBaileys, providerTwilio };
