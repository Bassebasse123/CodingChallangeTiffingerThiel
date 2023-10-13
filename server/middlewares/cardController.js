import { response } from "express";
import Card from "../models/cardModel.js";
import axios from "axios";
import mongoose from "mongoose";

export const getCards = async (req, res) => {
  try {
    await mongoose.connect(process.env.DB_URI);
    const cards = await Card.find();
    const response = {
      success: true,
      cards,
    };
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};
