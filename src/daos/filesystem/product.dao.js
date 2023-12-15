import fs from 'fs';

export class ProductDaoFileSystem {
    
    constructor(path) {
        this.path = path;
        console.log(path);
    }

    async #readProducts() {  //Obtengo la informacion del JSON, de no existir devuelvo un array vacio - De esta manera puedo reutilizar esta parte de codigo en otros metodos
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                
                return JSON.parse(data);
            }
            return []
        } catch (error) {
            return [];
        }
    }

    async getAll() { //Obtengo la lista de todos los productos, en caso de recibir un id, devuelve un producto si existe de esta manera unifico getProduct y getProductById
        try {
            const products = await this.#readProducts(); //Reutilizo metodo
            if (products) {
                return products
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
    async getById(id) { //Obtengo la lista de todos los productos, en caso de recibir un id, devuelve un producto si existe de esta manera unifico getProduct y getProductById
        try {
            const products = await this.#readProducts(); //Reutilizo metodo

            if (id && id > 0) {
                const product = products.find((product) => product.id === Number(id)); 
                return product || null;
            } else {
                return products;
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async create({ title, description, code, price, stock, category, thumbnail }) { //Obtengo la información del JSON y actualizo el array, luego actualizo el JSON

        try {
            const products = await this.#readProducts(); //Reutilizo metodo
            const maxId = Math.max(...products.map(product => product.id), 0); //Busco el id máximo que se encuentre en el array de los productos existentes

            if (products.some(product => product.code === code)) {
                const alert = { message: `Ya existe un producto con el código: ${code}` }
                return alert
            } else {

                const newProduct = {
                    id: maxId + 1,
                    title,
                    description,
                    code,
                    price,
                    status: true,
                    stock,
                    category,
                    thumbnail
                };

                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
                console.log(`Producto '${title}' Agregado, ID: ${newProduct.id}`);
                return newProduct;
            }
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    async update(id, fieldsToUpdate) {
        try {
            const products = await this.#readProducts();
            const productIndex = products.findIndex(product => product.id === id);

            if (productIndex === -1) {
                console.log(`No se encontró un producto con ID ${id}`);
                return null;
            }

            const productToUpdate = products[productIndex];

            if (fieldsToUpdate) {
                for (const key in fieldsToUpdate) {
                    if (key !== 'id' && key in productToUpdate) {
                        productToUpdate[key] = fieldsToUpdate[key];
                    }
                }

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
                console.log(`El producto con ID ${id} se actualizó correctamente`);
            } else {
                console.log('Establezca los campos que desea cambiar');
                return null;
            }
        } catch (error) {
            console.log('Error al actualizar el producto:', error);
            return null;
        }
    }


    async delete(ids) { // Obtengo los productos del JSON, utilizo un filter y como callback un includes para descargar los productos cuyo ID esten en el array "ids" que se recibe como parametro
        try {
            const products = await this.#readProducts();
            const newProducts = products.filter(product => !ids.includes(product.id)); // De esta manera genero un nuevo array con los productos que no quiero eliminar

            if (newProducts.length < products.length) { //Si los tamaños entre el original y el nuevo array son distintos entonces guardo la nueva informacion en el JSON
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2), 'utf-8');
                return newProducts
            } else {
                console.log('Productos no encontrados');
            }
        } catch (error) {
            console.log(error);
        }
    }

}
