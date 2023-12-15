import { Schema, model } from "mongoose";

export const messageCollectionName = "message";

const messageSchema = new Schema({
    user: {
      type: String,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
  })

export const messageModel = model(messageCollectionName, messageSchema);