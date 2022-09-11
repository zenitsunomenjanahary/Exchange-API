import express from "express";
import { createToy, deleteToy, getAllToys, getToysByUser, updateToy } from "../controllers/toy.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.get("/", getAllToys); 

router.get("/:id", getToysByUser); 

router.post("/",upload.single("photo"),createToy);

router.put("/:id",upload.single("photo"),updateToy);

router.delete("/:id", deleteToy );

export default router;