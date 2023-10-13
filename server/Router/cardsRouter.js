import express from "express";
import { getCards } from "../middlewares/cardController.js";
const router = express.Router();

router.route("/").get(getCards);

export default router;
