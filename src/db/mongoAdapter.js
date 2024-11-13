import mongoose from "mongoose";
import { config } from "../config/index.js";

const HistorySchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const MessagesSchema = new mongoose.Schema({
  UserQuestion: { type: String, required: true },
  intentions: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  history: [HistorySchema],
});

//Esquema para mensajes fallidos
const Messages = new mongoose.Schema({
  number: { type: String, require: true, unique: true },
  history: [MessagesSchema],
});

export const Customer = mongoose.model("bot_response", CustomerSchema);

//Definición mensajes fallidos
export const Message = mongoose.model("fail_detection", Messages);

export class MongoAdapter {
  constructor(dbURI) {
    this.dbURI = dbURI;
    this.connect();
  }
  //Conection to MongoDB
  async connect() {
    try {
      await mongoose.connect(this.dbURI);
      console.log("Conectado a MongoDB");
    } catch (error) {
      console.log("Error al conectar a MongoDB: ", error);
    }
  }

  //Add or update customer (only name, number or history)
  async addOrUpdateClient(CustomerData) {
    try {
      const existingCustomer = await Customer.findOne({
        number: CustomerData.number,
      });
      if (existingCustomer) {
        //only update history
        existingCustomer.history = CustomerData.history;
        await existingCustomer.save();
        return existingCustomer;
      } else {
        const newCustomer = new Customer(CustomerData);
        await newCustomer.save();
        return newCustomer;
      }
    } catch (error) {
      console.error("Error al agregar/actualizar al cliente: ", error);
    }
  }
  //Actualiza nuevo message
  async addOrUpdateMessage(CustomerData) {
    try {
      const existingCustomer = await Message.findOne({
        number: CustomerData.number,
      });
      if (existingCustomer) {
        //only update history
        existingCustomer.history = CustomerData.history;
        await existingCustomer.save();
        return existingCustomer;
      } else {
        const newCustomer = new Message(CustomerData);
        await newCustomer.save();
        return newCustomer;
      }
    } catch (error) {
      console.error("Error al agregar/actualizar al Messages: ", error);
    }
  }

  //Search customer by number
  async searchByCustomerNumber(number) {
    return await Customer.findOne({ number }).exec();
  }
  //Search on messages
  async searchByMessageNumber(number) {
    return await Message.findOne({ number }).exec();
  }

  //Add to history
  async addHistory(customerNumber, historyData) {
    try {
      const customer = await this.searchByCustomerNumber(customerNumber);

      if (!customer) {
        console.error(`Cliente con número ${customerNumber} no encontrado.`);
        return null;
      }
      //Agregar la nueva entrada al historial
      customer.history.push(historyData);
      await customer.save();
      //console.log(`Historial actualizado para el cliente con número ${customerNumber}`);
    } catch (error) {
      console.error("Error al agregar historial: ", error);
      return null;
    }
  }

  //Add to history Message
  async addHistoryMessage(customerNumber, historyData) {
    try {
      const customer = await this.searchByMessageNumber(customerNumber);

      if (!customer) {
        console.error(`Cliente con número ${customerNumber} no encontrado.`);
        return null;
      }
      //Agregar la nueva entrada al historial
      customer.history.push(historyData);
      await customer.save();
      //console.log(`Historial actualizado para el cliente con número ${customerNumber}`);
    } catch (error) {
      console.error("Error al agregar historial: ", error);
      return null;
    }
  }
}

export const mongoAdapter = new MongoAdapter(config.mongoDb_uri);
