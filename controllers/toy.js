import Toy from "../models/Toy.js"
import User from "../models/User.js";

export const getAllToys = async(req, res, next) => {
    try {
        const toys = await Toy.find().populate("owner");
        return res.status(200).json(toys)
    } catch (error) {
        return res.status(400).json("unable to get all toys");
    }
}

export const getToysByUser = async(req, res, next) => {
    const id = req.params.id;
    try {
        const toys = await Toy.find({ owner: id });
        return res.status(200).json(toys);
    } catch (error) {
        return res.status(400).json("unable to get toys for this user");
    }
}

export const createToy = async(req,res, next) => {
    const { name, owner, photo } = req.body;
    try {
        const toy = new Toy({ name,owner,photo })
        await toy.save();

        //update user Toy array
        const user = await User.findById(owner);
        user.toys.push(toy);
        await user.save();

        return res.status(200).json(toy);
    } catch (error) {
        return res.status(400).json("unable to create toy");
    }
}

export const updateToy = async(req,res,next) =>{
    const id = req.params.id;
    const { name, photo } = req.body
    try {
        const toy = await Toy.findByIdAndUpdate(id,{
            name, photo
        })
        await toy.save();
        return res.status(202).json(toy);
    } catch (error) {
        return res.status(400).json("unable to update toy by this id");
    }
}

export const updateOwnerToy = async(req,res,next) =>{
    const id = req.params.id;
    const { owner } = req.body;

    try {
        const toy = await Toy.findById(id);
        const user = await User.findById(toy.owner);
        
        user.toys.pull(toy);
        await user.save();

        toy.owner = owner;
        await toy.save();

        const newOwner = await user.findById(owner);
        newOwner.push(toy);
        await newOwner.save();

        return res.status(200).json("Owner toy updated");
    } catch (error) {
        return res.status(400).json("unable to update owner toy");
    }
}

export const deleteToy = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const toy = await toy.findByIdAndRemove(id).populate("owner");
        await toy.owner.toys.pull(toy);
        await toy.owner.save();
        return res.status(200).json("Toy deleted");

    } catch (error) {
        return res.status(400).json("Unable to delete toy by this id");
    }
}