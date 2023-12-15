import cartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import { CartDaoFileSystem } from "../daos/filesystem/cart.dao.js";

//const cartDao = new CartDaoFileSystem('./src/daos/filesystem/data/carts.json'); DESCOMENTAR PARA CAMBIAR PERSISTENCIA
const cartDao = new cartDaoMongoDB();

export const create = async () => {
    try {
        const newCart = await cartDao.createCart();
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        console.log(error);
    }
};

export const getCartById = async (id) => {
    try {
        const cart = await cartDao.getCartById(id);
        if (!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
};
export const saveProduct = async (idCart, idProduct) => {
    try {
        const cartUpd = await cartDao.saveProduct(idCart, idProduct);
        if (!cartUpd) return false;
        else return cartUpd;
    } catch (error) {
        console.log(error);
    }
};
export const remove = async (cId, idProd) => {
    try {
        const deleteProductInCart = await cartDao.remove(cId, idProd);
        if (!deleteProductInCart) return false;
        else return deleteProductInCart;
    } catch (error) {
        console.log(error);
    }
};
export const removeCart = async (cId) => {
    try {
        const cartDel = await cartDao.deleteCart(cId);
        if (!cartDel) return false;
        else return cartDel;
    } catch (error) {
        console.log(error);
    }

};
export const removeAllProducts = async (newQuantity ) => {
    try {
        const cleanCart = await cartDao.removeAllProducts(newQuantity );
        if (cleanCart.error){
            return false
        } else {
        return { message: "Todos los productos eliminados" };
        }
    } catch (error) {
        return { error: true, message: error.message };
    }
};
export const updateQuantity = async (cId, pId,quantity) => {
    try {
        const prodUpd = await cartDao.updateQuantity(cId, pId,quantity);
        if (!prodUpd) return false;
        else return prodUpd;
    } catch (error) {
        console.log(error);
    }
};
export const updateCart = async (cId, newProducts) => {
    try {
        const cartUpdate = await cartDao.cartUpdate(cId, newProducts);
        if (!cartUpdate) return false;
        else return cartUpdate;
    } catch (error) {
        console.log(error);
    }
};