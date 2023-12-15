import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  async getAll(page = 1, limit = 40, category, sort) {
    try {
      // Construir el objeto de búsqueda basado en los parámetros proporcionados
      let query = {};

      // Agregar filtro por categoría si se proporciona
      if (category) {
        query = { 'category': category };
      }
      const options = { page, limit };
      if (sort) {
        options.sort = { price: sort === 'asc' ? 1 : -1 };
      }
      const response = await ProductModel.paginate(query, options);

      return response;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener productos');
    }
  }


  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const products = await ProductModel.find();
      if (products.some(product => product.code === obj.code)) {
        const response = { message: `Ya existe un producto con el código: ${obj.code}` }
        return response
      } else {
        const response = await ProductModel.create(obj);
        return response;
      }
    } catch (error) {
      console.log(error,);
    }
  }

  async update(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}