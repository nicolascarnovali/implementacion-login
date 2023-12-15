import * as services from '../services/message.services.js';

export const getAll = async (req, res) => {
    try {
        const messages = await services.getAll();
        // Renderizar la plantilla con los datos obtenidos
        res.render('chat', { messages });
    } catch (error) {
        console.log('Error al cargar la página del chat');
    }
}
export const create = async (req, res) => {
    try {
        const { message } = req.body;
        await services.create(message);
        res.redirect('/chat');
    } catch (error) {
        console.log('Error al crear el chat');
    }
}