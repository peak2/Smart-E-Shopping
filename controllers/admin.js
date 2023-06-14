const Product = require("../models/product");

// exports.getAddProduct = (req, res, next) => {
//   res.render("admin/add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",                            
//   });
// };

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
    // pageButton: "Add Product"                             
  });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};


//Query parameter can be added to a url by adding question mark followed by key=value pair 
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;        // checking if d browser url query parameter/s contains "edit" as a
  if(!editMode) {                        // key in http://localhost:3905/admin/edit-product/12345/?edit=true
    return res.redirect('/')             // the query parameters can b more than one key=value pair, just use 
  } 
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/')
    }
    res.render("admin/edit-product", {     // http://localhost:3905/admin/edit-product/12345/?edit=true&ade=boy
      pageTitle: "Edit Product",           // const editMode = req.query.ade;
      path: "/admin/edit-product", 
      editing: editMode,
      product: product,
      // pageButton: "Update Product"                           
    });
  })                                     // the key to confirm what you are doing 
};


exports.postEditProduct = (req, res, next) => {
  
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products", 
        });
      });
}