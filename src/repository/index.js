import { UserRepository } from "./user.repository.js";
import { CartRepository } from "./cart.repository.js";
import { ProductRepository } from "./product.repository.js";
import { TicketRepository } from "./ticket.repository.js";
import { userDao, cartDao, productDao, ticketDao } from "../dao/factory.js";

const userRepository = new UserRepository(userDao);
const cartRepository = new CartRepository(cartDao);
const productRepository = new ProductRepository(productDao);
const ticketRepository = new TicketRepository(ticketDao);

export { userRepository, cartRepository, productRepository, ticketRepository };
