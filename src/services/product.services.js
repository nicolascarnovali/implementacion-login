import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import { ProductDaoFileSystem } from "../daos/filesystem/product.dao.js";
const productDao = new ProductDaoMongoDB();
//const productDao = new ProductDaoFileSystem('./src/daos/filesystem/data/products.json') //DESCOMENTAR PARA CAMBIAR PERSISTENCIA DE ARCHIVOS
export const getAll = async (page, limit, category,sort) => {
    try {
        return await productDao.getAll(page, limit, category,sort);        
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        const prod = await productDao.getById(id);
        if (!prod) return false;
        else return prod;
    } catch (error) {
        console.log(error);
    }
};

export const create = async (obj) => {
    try {
        const newProd = await productDao.create(obj);
        if (!newProd) return false;
        else return newProd;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (id, obj) => {
    try {
        const prodUpd = await productDao.update(id, obj);
        if (!prodUpd) return false;
        else return prodUpd;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const prodDel = await productDao.delete(id);
        if (!prodDel) return false;
        else return prodDel;
    } catch (error) {
        console.log(error);
    }

};
export const sort = async (category) =>{
    try {
        return await productDao.sortProtuct(category)
    } catch (error) {
        logError(error);
    }
}


