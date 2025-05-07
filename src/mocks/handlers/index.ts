import { authHandlers } from './auth';
import { productHandlers } from './products';
import { cartHandlers } from './cart';
import { orderHandlers } from './orders';
import { alertHandlers } from './alerts';
import { creditHandlers } from './credits';
import { rfiHandlers } from './rfi';

export const handlers = [
  ...authHandlers,
  ...productHandlers,
  ...cartHandlers,
  ...orderHandlers,
  ...alertHandlers,
  ...creditHandlers,
  ...rfiHandlers,
];