import fs from 'fs';

export class CartDaoFileSystem {
    constructor(path) {
        this.path = path;
    }

    async #readCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
            } else {
                return []
            }
        } catch (e) {
            console.error('Error en #readCarts:', e);
            return [];
        }
    }
    async #getMaxId() {
        let maxId = 0;
        const carts = await this.#readCarts();
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;
        });
        return maxId
    }

    async createCart() {
        try {
            const cart = {
                id: await this.#getMaxId() + 1,
                products: []
            };
            const cartsFile = await this.#readCarts();
            cartsFile.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
            return cart
        } catch (error) {
            console.error('Error en #readCarts:', error);
        }
    }

    async getCarts(id) {
        try {
            const carts = await this.#readCarts(); //Reutilizo metodo

            if (id && id > 0) {
                const cart = carts.find((c) => c.id === id);
                return cart || null;
            } else {
                return carts;
            }
        } catch (error) {
            console.error('Error al obtener los carritos:', error);
        }
    }
    async saveProduct(idCart, idProduct) {
        try {
            const carts = await this.#readCarts();
            const cartOk = await this.getCarts(idCart);
            if (cartOk) {
                const producOk = cartOk.products.find(p => p.productId === idProduct);
                if (producOk) producOk.quantity += 1;
                else {
                    const newProduct = {
                        productId: idProduct,
                        quantity: 1
                    };
                    cartOk.products.push(newProduct);
                }
                const cartIndex = carts.findIndex(c => c.id === idCart);
                if (cartIndex !== -1) {
                    carts[cartIndex] = cartOk;
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');

                return cartOk;
            } else {
                return { 'message': 'Cart not found' }
            }
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
            return { 'error': error.message };
        }
    }

}
