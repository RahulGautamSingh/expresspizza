const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const pizzaController = require("./controllers/pizzaController");
const orderController = require("./controllers/orderController");
app.set("view engine", "pug");
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));

mongoose.connect("mongodb://127.0.0.1:27017/expresspizza", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", async (req, res) => {
  res.send("Welcome to Express Pizza");
});
app.get("/pizzas", async (req, res) => {
  if (req.url.length === 7) {
    let result = await pizzaController.seeAllPizzas();
    result.status ? res.send(result.list) : res.send(result.message);
  } else {
    let ingList = req.url.split("=");
    let ingredients = ingList[1].split(",");
    let result = await pizzaController.findPizzas(ingredients);
    result.status ? res.send(result.list) : res.send(result.message);
  }
});
app.get("/orders", async (req, res) => {
  let result = await orderController.seeAllOrders();
  result.status ? res.send(result.list) : res.send(result.message);
});
app.get("/order/:id", async (req, res) => {
  let orderId = req.params.id;

  let result = await orderController.findOrder(orderId);
  result.status ? res.send(result.order) : res.send(result.message);
});

// 60c2e0037020c294e2bdf475
// 60c2e43804a0fb1f299ed674

const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
