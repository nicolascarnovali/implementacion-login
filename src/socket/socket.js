import { Server } from 'socket.io';
import MessageDaoMongoDB from '../daos/mongodb/message.dao.js'; //Dejo el dao de los msg para mostrar las diferencias del controller de productos
import * as controller from '../controllers/product.controllers.js';

const configureSocketIO = (httpServer) => {
    const socketServer = new Server(httpServer);
    const messageDao = new MessageDaoMongoDB();
    socketServer.on('connection', async (socket) => {
        console.log(`Usuario Conectado ${socket.id}`);
        
        //lista de productos al inicio
        const listProducts = await controller.getAllRealTime();

        // lista de productos a todos los clientes al conectar
        socket.emit('getProducts', listProducts);

        socket.on('newProduct', async (newProduct) => {
            // nuevo producto
            await controller.createRealTime(newProduct);

            // lista actualizada de productos
            const updatedProducts = await controller.getAllRealTime();

            //lista actualizada a todos los clientes
            socketServer.emit('getProducts', updatedProducts);
        });

        socket.on('deleteProduct', async (deletedProduct) => {
            // Elimina el producto
            await controller.removeRealtime(deletedProduct);

            // la lista actualizada de productos
            const updatedProducts = await controller.getAllRealTime();

            //lista actualizada a todos los clientes
            socketServer.emit('getProducts', updatedProducts);
        });

        socket.on('disconnect', () => {
            console.log(`Usuario Desconectado ${socket.id}`);
        });

        console.log('🟢 ¡New connection!', socket.id);

        
    socketServer.emit('messages', await messageDao.getAll());

    socket.on('disconnect', ()=>console.log('🔴 ¡User disconnect!', socket.id));
    socket.on('newUser', (user)=>console.log(`⏩ ${user} inició sesión`));

    socket.on('chat:message', async(msg)=>{
        await messageDao.create(msg);
        socketServer.emit('messages', await messageDao.getAll());
    })

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user)
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
        
    });

    
};

export default configureSocketIO;
