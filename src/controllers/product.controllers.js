import * as services from "../services/product.services.js";

export const getAll = async (req, res, next) => {
    try {
        const { page, limit, category,sort } = req.query;
        const response = await services.getAll(page,limit,category,sort);
        const nextLink = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prevLink = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        
        res.status(200).json({
            status: response.docs.length > 0 ? 'success' : 'error',
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,            
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage ? 'Sí existe' : 'No existe',
            hasNextPage: response.hasNextPage ? 'Sí existe' : 'No existe',
            prevLink,
            nextLink
            
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await services.getById(id);
        if (!response) res.status(404).json({ msg: "Producto no Encontrado!" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await services.create(req.body);
        if (!newProd) res.status(404).json({ msg: "Error al crear el  producto" });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await services.update(id, req.body);
        if (!prodUpd) res.status(404).json({ msg: "Error al actualizar el producto" });
        else res.status(200).json(prodUpd);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await services.remove(id);
        if (!prodDel) res.status(404).json({ msg: "Error al eliminar el  producto" });
        else res.status(200).json({ msg: `Producto id: ${id} eliminado` });
    } catch (error) {
        next(error.message);
    }
};

export const getAllRealTime = async () => {
    try {
        const response = await services.getAll();
        return response;
    } catch (error) {
        throw error;
    };
}

export const createRealTime = async (productData) => {
    try {
        const newProd = await services.create(productData);
        if (!newProd) {
            throw new Error("Error al crear el producto");
        }
        return newProd;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};
export const removeRealtime = async (productId) => {
    try {
        const prodDel = await services.remove(productId);
        if (!prodDel) {
            throw new Error("Error al eliminar el producto");
        }
        return { msg: `Producto id: ${productId} eliminado` };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};