const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products", //This path is passed to navigation.ejs to check for active page, wch is defined in main.css active class
    });
  });
};

exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/", //This path is passed to navigation.ejs to check for active page, wch is defined in main.css active class
  });
}

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Carts",
    path: "/cart", 
  });
};