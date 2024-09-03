import mongoDao from "./mongo/index.js";
import { config } from "../config/config.js";
import { connectDB } from "../config/connect.mongo.js";

function getDao() {
  switch (config.PERSISTENCE) {
    case "sql":
      console.log("SQL - Sequelize not implemented yet");
      return;

    case "mongodb":
    default:
      connectDB();
      return {
        userDao: new mongoDao.userDao(),
        cartDao: new mongoDao.cartDao(),
        productDao: new mongoDao.productDao(),
        ticketDao: new mongoDao.ticketDao(),
      };
  }
}

export const { userDao, cartDao, productDao, ticketDao } = getDao();
