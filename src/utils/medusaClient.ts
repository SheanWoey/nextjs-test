import Medusa from '@medusajs/medusa-js';
import { MEDUSA_BACKEND_URL } from 'src/config-global';

export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
});
