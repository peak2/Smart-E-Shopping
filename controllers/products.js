const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product", // This path is passed to navigation.ejs to check for active page, wch is defined in main.css                             // active class
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      price: "$20.25",
      description:
        "A very interesting book, read to us by Mrs Bello when i was in JSS1",
      path: "/", //This path is passed to navigation.ejs to check for active page, wch is defined in main.css active class
    });
  });
};
