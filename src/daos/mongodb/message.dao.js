import { messageModel } from "./models/message.model.js";

export default class MessageDaoMongoDB {
    
    async getAll() {
      try {
  
        const response = await messageModel.find({});
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    async create(obj) {
      try {  
        console.log(obj);
        const response = await messageModel.create(obj);
        return response;
      } catch (error) {
        console.log(error);
      }
    }

}