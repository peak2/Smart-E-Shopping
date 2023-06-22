const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false                            
  });
};


// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//   Product.create({
//     title: title, 
//     imageUrl: imageUrl, 
//     price: price, 
//     description: description,
//     userId: req.user.id
//   })
//   .then(result => {
//     // console.log(result);
//     console.log('Created Product');
//     res.redirect('/admin/products')
//   })
//   .catch(err => {
//     console.log(err);
//   })
// };

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({            //Product.create({
  title: title, 
  imageUrl: imageUrl, 
  price: price, 
  description: description            // description: description, userId: req.user.id
})                                    // })
.then(result => {
  // console.log(result);
  console.log('Created Product');
  res.redirect('/admin/products')
})
.catch(err => {
  console.log(err);
})
};


// //Query parameter can be added to a url by adding question mark followed by key=value pair 
// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;        // checking if d browser url query parameter/s contains "edit" as a
//   if(!editMode) {                         // key in http://localhost:3905/admin/edit-product/12345/?edit=true
//     return res.redirect('/')              // the query parameters can b more than one key=value pair, just use 
//   }                                       // http://localhost:3905/admin/edit-product/12345/?edit=true&ade=boy
//   const prodId = req.params.productId     // const editMode = req.query.ade;
//   Product.findById(prodId, product => {   // the key to confirm what you are doing
//     if(!product) {
//       return res.redirect('/')
//     }
//     res.render("admin/edit-product", {     
//       pageTitle: "Edit Product",           
//       path: "/admin/edit-product", 
//       editing: editMode,
//       product: product,                          
//     });
//   })                                      
// };


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;        
  if(!editMode) {                         
    return res.redirect('/')              
  }                                       
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })     
  // Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
    if(!product) {
      return res.redirect('/')
    }
    res.render("admin/edit-product", {     
      pageTitle: "Edit Product",           
      path: "/admin/edit-product", 
      editing: editMode,
      product: product,                          
    })
  })
  .catch(err => {
    console.log(err);
  })                                      
};

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;
//   const updatedProduct = new Product(
//     prodId, 
//     updatedTitle, 
//     updatedImageUrl, 
//     updatedPrice, 
//     updatedDescription
//   );
//   updatedProduct.save();
//   res.redirect("/admin/products");
// }


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle, 
    product.imageUrl = updatedImageUrl, 
    product.price = updatedPrice, 
    product.description = updatedDescription
    return product.save();
  })
  .then(result => {
    console.log('UPDATED PRODUCT!')
    res.redirect("/admin/products"); 
  })
  .catch(err => console.log(err))
}




exports.getProducts = (req, res, next) => {
  req.user.getProducts()          // Product.findAll()
  .then(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products", 
    });
  })
  .catch(err => console.log(err))
}


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('PRODUCT DESTROYED');
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))
}