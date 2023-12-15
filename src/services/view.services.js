import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import UserDao from "../daos/mongodb/user.dao.js";

export default class ViewServices {
    constructor() {
        this.productDao = new ProductDaoMongoDB();
        this.userDao = new UserDao();
    }

    async getAll() {
        try {
            const data = await this.productDao.getAll();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async register(user){
        try {
            const response = await this.userDao.register(user);
            if (!response) {
                throw new Error('El registro del usuario ha fallado');
            }
            return response;
        } catch (error) {
            throw new Error('Ocurrió un error durante el registro');
        }
    }

    async login(email, password) {
        try {
            const user = await this.userDao.login({ email, password });
            if (!user) {
                throw new Error('Credenciales inválidas');
            }
            return user; 
        } catch (error) {
            throw new Error('Ocurrió un error durante el inicio de sesión');
        }
    }

}
