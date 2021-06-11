const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  pizza: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Pizza",
  },
  quantity: {
    type: Number,
    required: true,
    unique: false,
  },
});

const OrderModel = new mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
