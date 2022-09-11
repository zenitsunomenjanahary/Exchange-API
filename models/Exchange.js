import mongoose from "mongoose";

const Schema = mongoose.Schema

const exchangeSchema = new Schema({
    username: { type: String, required: true },
    contact: { type: String, required: true },
    toyToExchange: { type: String, required: true},
    exchangeTo: { type: String, required: true},
    photo: { type: String, required: true},
    status: { type: String, default: "activate" },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

export default Exchange;