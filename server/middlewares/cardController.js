import { response } from "express";
import Card from "../models/cardModel.js";
import axios from "axios";
import mongoose from "mongoose";

export const getCards = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://dammannbastian:Lollipop00!@bastiandammann.3rwo0yn.mongodb.net/tiffingerthiel"
    );
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
