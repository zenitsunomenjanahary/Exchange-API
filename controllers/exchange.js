import Exchange from "../models/Exchange.js";
import Toy from "../models/Toy.js";
import User from "../models/User.js";

export const createExchange = async(req, res,next) =>{
    const { username, contact, toyToExchange, photo, exchangeTo } = req.body
    try {
        // check if toy to exchange really exist
        const toy = await Toy.findOne({ name: toyToExchange });

        // check if username correspond with the user authenticated name
        const user = await User.findOne({ name: username });

        if(toy && user){
            const exchange = new Exchange({
                username, contact, toyToExchange, photo, exchangeTo
            });
            await exchange.save();
            return res.status(201).json(exchange);
        }

        return res.status(400).json("Unable to create exchange because of invalid information, check your toy and name")

    } catch (error) {
        return res.status(400).json("Unable to create exchange");
    }
}

//get all data exchanges list 
export const getExchanges = async(req, res,next)=> {
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status || "activate";

        const exchanges = await Exchange.find()
                                        .where({status})
                                        .skip(page * limit)
                                        .limit(limit)
        
        const total = await Exchange.countDocuments({status});

        const response = {
            error: false,
            total,
            page: page +1,
            limit,
            exchanges,
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json("Unable to get exchanges list");
    }
}

export const desactivateExchange = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const exchange = await Exchange.findByIdAndUpdate(id,{
            status: "desactivate"
        })
        await exchange.save();
        return res.status(200).json("Exchange desactivate");
    } catch (error) {
        return res.status(400).json("Unable to update exchange by this id");
    }
}
