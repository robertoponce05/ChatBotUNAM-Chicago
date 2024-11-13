import "dotenv/config";

export const config = {
  // Agregar todas las variables de entorno
  PORT: process.env.PORT || 3008,
  provider: process.env.provider,
  // Meta
  jwtToken: process.env.jwtToken,
  numberId: process.env.numberId,
  verifyToken: process.env.verifyToken,
  version: "v20.0",
  // OpenAI
  openai_apiKey: process.env.openai_apiKey,
  model: process.env.model,
  //MongoDB
  mongoDb_uri: process.env.mongoDb_uri,
};
