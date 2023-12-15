import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { __dirname } from './utils.js';
import { initMongoDB, connectionString } from './daos/mongodb/connection.js';
import { errorHandler } from './middelwares/errorHandler.js';
import handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import configureSocketIO from './socket/socket.js';
import userRouter from './routes/user.router.js';

const app = express();

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '12345'
        }
    }),
    secret: '12345',
    resave: false,
    saveUninitialized : true,
    cookie: {
        maxAge: 120000
    }
}
app.use(express.json());
app.use(cookieParser());
app.use(session(mongoStoreOptions)); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));


app.use(errorHandler);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/api/users", userRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views/');
app.set('view engine', 'handlebars');

app.use('/views', viewRouter);

await initMongoDB();

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server Ok on Port ${PORT}`));

configureSocketIO(httpServer)
