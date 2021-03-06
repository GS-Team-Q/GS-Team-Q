const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("Pending", "Cancelled", "Purchased"),
    allowNull: false,
    defaultValue: "Pending",
  },
});

module.exports = Order;
