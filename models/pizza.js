const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    unique: false,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const PizzaModel = new mongoose.model("Pizza", PizzaSchema);

module.exports = PizzaModel;
