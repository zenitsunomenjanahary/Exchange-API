import express from "express"
import { createExchange, desactivateExchange, getExchanges } from "../controllers/exchange.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.get("/",getExchanges );

router.post("/",upload.single("photo"),createExchange );

router.put("/:id", desactivateExchange);

export default router;