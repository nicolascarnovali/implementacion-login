export const validationProduct = (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        res.status(404).send({ message: 'Todos los campos son obligatorios' });
    } else {
        next()
    }

}