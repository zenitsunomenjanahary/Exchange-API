import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

//Route import
import userRoutes from "./routes/user.js";
import toyRoutes from "./routes/toy.js";
import exchangeRoutes from "./routes/exchange.js";

//configuration
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

//env variable
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

//Database connexion
mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`database connected`))
    .catch((err) => console.log(err) );

//Routes
app.use("/user", userRoutes );
app.use("/toy", toyRoutes );
app.use("/exchange", exchangeRoutes );

//run app
app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`))



