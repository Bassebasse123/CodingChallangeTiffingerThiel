import { Schema, model } from "mongoose";

const commonStringObjs = {
  type: String,
  required: false,
  trim: true,
};

const cardSchema = new Schema({
  name: commonStringObjs,
  imageUrl: commonStringObjs,
  colors: [commonStringObjs],
  type: commonStringObjs,
});

export default model("Card", cardSchema);
