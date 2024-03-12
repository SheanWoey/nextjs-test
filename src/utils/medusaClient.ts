import Medusa from "@medusajs/medusa-js";
const medusaClient = new Medusa({
  baseUrl: process.env.MEDUSA_BACKEND_URL ?? "http://localhost:8080",
  maxRetries: 3,
});

export default medusaClient;
