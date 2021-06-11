const Pizza = require("../models/pizza");

const addNewPizza = async (name, price, ingredients) => {
  if ((await Pizza.findOne({ name: name })) !== null) {
    return { status: false, message: "Pizza already exists" };
  }

  let pizza = new Pizza({ name: name, price: price, ingredients: ingredients });
  try {
    await pizza.save();
  } catch (err) {
    return { status: false, message: err.message };
  }
};

const findPizzas = async (ingredientsArr) => {
  let res = [];
  let pizzas = await Pizza.find({});
  pizzas.forEach((pizza) => {
      let flag=false;
    ingredientsArr.forEach((item) => {
      if (!pizza.ingredients.includes(item)) flag=true;
    });
    if(!flag) res.push(pizza)
  });
  if (res.length === 0) {
    return { status: false, message: "No such pizza exists" };
  }
  return { status: true, list: res };
};

const seeAllPizzas = async () => {
  let pizzas = await Pizza.find({});

  if (pizzas.length === 0) {
    return { status: false, message: "No  pizza exists" };
  }
  return { status: true, list: pizzas };
};

module.exports = {
  addNewPizza,
  findPizzas,
  seeAllPizzas,
};
