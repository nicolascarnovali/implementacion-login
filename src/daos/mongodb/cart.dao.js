import { CartModel } from "./models/cart.model.js";
export default class CartDaoMongoDB {
  async createCart() {
    try {
      const cart = await CartModel.create({ products: [] });
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const response = await CartModel.find()
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProduct(idCart, idProduct) {
    try {
      const cartOk = await CartModel.findById(idCart);

      if (cartOk) {
        const existingProductIndex = cartOk.products.findIndex(producto => String(producto.product._id) === String(idProduct));

        if (existingProductIndex !== -1) {
          cartOk.products[existingProductIndex].quantity += 1;
        } else {
          const newProduct = { product: idProduct, quantity: 1 };
          cartOk.products.push(newProduct);
        }

        await cartOk.save();
        return { message: 'Producto Guardado con éxito en el carrito' };
      } else {
        return { message: 'El carrito no existe' };
      }
    } catch (error) {
      console.error('Error al guardar el producto en el carrito:', error);
      return { error: error.message };
    }
  }

  async remove(idCart, idProduct) {
    try {
      const cart = await CartModel.findById(idCart);
      if (cart) {
        const existingProductIndex = cart.products.findIndex(producto => String(producto.product._id) === String(idProduct));
        if (existingProductIndex !== -1) {
          cart.products.pull({ _id: cart.products[existingProductIndex]._id });
          return await cart.save();
        } else {
          throw { message: 'El producto no existe en el carrito' };
        }

      } else {
        throw { message: 'El carrito no existe' };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
  async deleteCart(cId) {
    try {
      const response = await CartModel.findByIdAndDelete(cId);
  
      if (response) {
        return response;
      } else {
        throw { message: 'El carrito no existe' };
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async removeAllProducts(cId) {
    try {
      const cart = await CartModel.findById(cId);
      if (!cart) {
        return { error: true, message: "El carrito no existe" };
      }
      cart.products = [];
      return await cart.save();
    } catch (error) {
      console.log(error);
    }

  }

  async updateQuantity(cId, pId, quantity) {
    try {
      const cartOk = await CartModel.findById(cId);
      if (cartOk) {
        const existingProductIndex = cartOk.products.findIndex(producto => String(producto.product._id) === String(pId));

        if (existingProductIndex !== -1) {
          // Si el producto ya existe, incremento la cantidad en 1
          cartOk.products[existingProductIndex].quantity = quantity;
        } else {
          throw error({ message: " El producto no existe en el carrito " })
        }
      }
      return await cartOk.save();

    } catch (error) {
      console.log(error);
    }
  }
  async cartUpdate(cId, newProducts) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        cId,
        { products: newProducts.map(product => ({ product })) },
        { new: true, runValidators: true }
      );
  
      if (!updatedCart) {
        return { error: true, message: "El carrito no existe" };
      }
  
      return { error: false, message: "Carrito actualizado", updatedCart };
  
    } catch (error) {
      console.error(error);
      return { error: true, message: "Error al actualizar el carrito" };
    }
  }
  
  
}