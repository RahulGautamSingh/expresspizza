const Order = require("../models/order");
const Pizza = require("../models/pizza");

const addNewOrder = async (pizzaName, quantity) => {
  let pizza = await Pizza.findOne({ name: pizzaName });
  if (pizza === null) {
    return { status: false, message: "Pizza non-existent e" };
  }

  let order = new Order({ pizza: pizza._id, quantity: quantity });
  try {
    await order.save();
  } catch (err) {
    return { status: false, message: err.message };
  }
};

const findOrder = async (ID) => {
  let order = await Order.findOne({ _id: ID }).populate("pizza");

  if (order === null) {
    return { status: false, message: "No such order exists" };
  }
  return { status: true, order: order };
};

const seeAllOrders = async () => {
  let orders = await Order.find({}).populate("pizza");

  if (orders.length === 0) {
    return { status: false, message: "Bankruptcy seems closer than expected" };
  }

  return { status: true, list: orders };
};

module.exports = {
  addNewOrder,
  findOrder,
  seeAllOrders,
};
