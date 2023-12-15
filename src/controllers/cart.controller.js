import * as cartServices from "../services/cart.services.js";

export const create = async (req, res, next) => {
    try {
        const newCart = await cartServices.create();
        if (!newCart) res.status(404).json({ msg: "Error al crear el carrito" });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error.message);
    }
};
export const getAll = async (req, res, next) => {
    try {
        const response = await cartServices.getAll();
        const limit = parseInt(req.query.limit) || 0;
        if (limit > 0) {
            const limitProducts = response.slice(0, limit);
            res.status(200).json(limitProducts);
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await cartServices.getCartById(id);
        if (!response) res.status(404).json({ msg: "Carrito no Encontrado!" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};
export const update = async (req, res, next) => {
    try {
        const { cId } = req.params;
        const { idProd } = req.params;
        const cartUpdate = await cartServices.saveProduct(cId, idProd);

        if (!cartUpdate) res.status(404).json({ msg: "Error al actualizar el carrito" });
        else res.status(200).json(cartUpdate);
    } catch (error) {
        next(error.message);
    }
};
export const remove = async (req, res, next) => {
    try {
        const { cId, idProd } = req.params;
        const deleteProductInCart = await cartServices.remove(cId, idProd);
        if (deleteProductInCart.error) res.status(404).json({ msg: "Error al eliminar el producto " });
        else res.status(200).json({ msg: "Prodcuto eliminado" });
    } catch (error) {
        next(error.message);
    }
};
export const removeCart = async (req, res, next) => {
    try {
        const { cId } = req.params;
        const cartDel = await cartServices.removeCart(cId);
        if (cartDel.error) res.status(404).json({ msg: "Error al eliminar el  carrito" });
        else res.status(200).json({ msg: `Carrito id: ${cId} eliminado` });
    } catch (error) {
        next(error.message);
    }
};
export const removeAllProducts = async (req, res, next) => {
    try {
        const { cId } = req.params;
        const removeAllProductsResult = await cartServices.removeAllProducts(cId);

        if (removeAllProductsResult.error) {
            res.status(404).json({ msg: "No se pudieron eliminar todos los productos del carrito" });
        } else if (removeAllProductsResult.message === "Todos los productos eliminados") {
            res.status(200).json({ msg: "Todos los productos del carrito eliminados" });
        } else {
            res.status(404).json({ msg: "El carrito no existe" });
        }
    } catch (error) {
        next(error.message);
    }
};
export const updateQuantity = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { cId, pId } = req.params;
        const response = await cartServices.updateQuantity(cId, pId, quantity);
        if (!response) res.status(404).json({ msg: "Error al cambiar la cantidad!" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cId } = req.params;
        const { products } = req.body;

        const updateCartResult = await cartServices.updateCart(cId, products);

        if (updateCartResult.error) {
            res.status(404).json({ msg: "No se pudo actualizar el carrito con los nuevos productos" });
        } else if (updateCartResult.message === "Carrito actualizado") {
            res.status(200).json({ msg: "Carrito actualizado exitosamente con los nuevos productos" });
        } else {
            res.status(404).json({ msg: "El carrito no existe" });
        }
    } catch (error) {
        next(error.message);
    }
};