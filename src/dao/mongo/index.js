import { UserDao } from "./user.dao.js";
import { CartDao } from "./cart.dao.js";
import { ProductDao } from "./product.dao.js";
import { TicketDao } from "./ticket.dao.js";

export default {
  userDao: UserDao,
  cartDao: CartDao,
  productDao: ProductDao,
  ticketDao: TicketDao,
};
