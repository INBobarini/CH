import {cartsModel} from '../models/schemas.js'

// Middleware function to populate the products field of a cart
async function populateCartProducts(req, res, next) {
  try {
    const cart = await cartsModel.findById(req.params.cid).populate('products.product');
    //console.log(JSON.stringify(cart,null,'\t'))
    if (!cart) {
      const err = new Error('Cart not found');
      err.status = 404;
      throw err;
    }
    req.cart = cart;
    next();
  } catch (err) {
    next(err);
  }
}

export {populateCartProducts}