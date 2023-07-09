const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }


  //this will add cart and items under cart in users collection in the database
  //    addToCart(product) {
  //     const updatedCart = { items: [{ ...product, quantity: 1 }]}
  //     const db = getDb();
  //     return db
  //     .collection('users')
  //     .updateOne(
  //         { _id: new ObjectId(this._id) },
  //         { $set: {cart: updatedCart} }
  //     )
  // }


  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      //checking whether certain item exists
      return cp.productId.toString() === product._id.toString();
    });
    console.log("cartProductIndex", cartProductIndex);
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      });
  }

  deleteItemFromCart(productId){
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString()
    })
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }


//   const { MongoClient } = require('mongodb');

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
  
//   MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
    
//     const db = client.db('your_database_name');
//     const cartCollection = db.collection('carts');
//     const productCollection = db.collection('products');
    
//     cartCollection.findOne({ user: req.user._id })
//       .then(cart => {
//         return productCollection.findOne({ _id: prodId });
//       })
//       .then(product => {
//         return cartCollection.updateOne({ _id: cart._id }, { $pull: { products: { _id: product._id } } });
//       })
//       .then(result => {
//         res.redirect('/cart');
//         client.close();
//       })
//       .catch(err => {
//         console.log(err);
//         client.close();
//       });
//   });
// };


  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
