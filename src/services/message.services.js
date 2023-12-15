import MessageDaoMongoDB from "../daos/mongodb/message.dao.js";

const messageDao = new MessageDaoMongoDB();

export const getAll = async () => {
    try {
        return await messageDao.getAll();        
    } catch (error) {
        console.log(error);
    }
};

export const create = async (data) => {
    try {
        const newMsg = await messageDao.create(data);
        if (!newMsg) return false;
        else return newMsg;
    } catch (error) {
        console.log(error);
    }
}