import ViewServices from "../services/view.services.js";

export default class ViewController {
    constructor() {
        this.services = new ViewServices();
    }

    async getAll(req, res, next) {
        try {
            const response = await this.services.getAll();
            const loginResponse = req.session.loginResponse;
            console.log(loginResponse);
            const responseLiteral = response.docs.map(producto => {
                return {
                    title: producto.title,
                    description: producto.description,
                    code: producto.code,
                    price: producto.price,
                    status: producto.status,
                    stock: producto.stock,
                    category: producto.category,
                    thumbnail: producto.thumbnail,
                };
            });
            res.render('home', { response: responseLiteral, user:loginResponse });

        } catch (error) {
            console.log(error.message);
        }
    }
}
