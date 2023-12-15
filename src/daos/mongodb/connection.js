import { connect } from 'mongoose';

//const connectionString = "mongodb://127.0.0.1:27017/ecommerce";
export const connectionString = "mongodb+srv://nicolascarnovali:astralsius2005nico@cluster0.c6ofv6u.mongodb.net/coder"
export const initMongoDB = async () => {
  try {
    await connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};