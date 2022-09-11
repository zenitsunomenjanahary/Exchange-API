import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:   { type: String, required: [true, "name is required"] },
    email: { type: String, required: [true, " email is required"], unique: true },
    phone: { type: String, required: [true, "contact  is required"] },
    password: { type: String, required: true, min:4 },
    toys: { type: [mongoose.Types.ObjectId], ref:"Toy" }
});

const User = mongoose.model("User", userSchema);

export default User;