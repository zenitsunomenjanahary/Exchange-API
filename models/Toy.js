import mongoose from "mongoose";

const Schema = mongoose.Schema

const toySchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref:"User" },
});

const Toy = mongoose.model("Toy", toySchema);

export default Toy;