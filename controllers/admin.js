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
  });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product
  .save()
  .then(() => {
    res.redirect("/");
  })
  .catch(err =>  console.log(err));
};


//Query parameter can be added to a url by adding question mark followed by key=value pair 
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;        // checking if d browser url query parameter/s contains "edit" as a
  if(!editMode) {                         // key in http://localhost:3905/admin/edit-product/12345/?edit=true
    return res.redirect('/')              // the query parameters can b more than one key=value pair, just use 
  }                                       // http://localhost:3905/admin/edit-product/12345/?edit=true&ade=boy
  const prodId = req.params.productId     // const editMode = req.query.ade;
  Product.findById(prodId, product => {   // the key to confirm what you are doing
    if(!product) {
      return res.redirect('/')
    }
    res.render("admin/edit-product", {     
      pageTitle: "Edit Product",           
      path: "/admin/edit-product", 
      editing: editMode,
      product: product,                          
    });
  })                                      
};


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId, 
    updatedTitle, 
    updatedImageUrl, 
    updatedPrice, 
    updatedDescription
  );
  updatedProduct.save();
  res.redirect("/admin/products");
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


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
  res.redirect('/admin/products')

}