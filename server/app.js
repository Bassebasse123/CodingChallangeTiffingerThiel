import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Card from "./models/cardModel.js";
import cardsRouter from "./Router/cardsRouter.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: [, "http://localhost:3000"],
    credentials: true,
  })
);
const fetchData = async () => {
  const response = await fetch("https://api.magicthegathering.io/v1/cards");
  const data = await response.json();
  console.log(data.cards);
  try {
    await mongoose.connect(process.env.DB_URI);

    const cards = data.cards.map((card) => {
      return {
        name: card.name,
        imageUrl: card.imageUrl,
        colors: card.colors,
        type: card.type,
      };
    });

    await Card.deleteMany();
    console.log("Cards data deleted successfuly");

    await Card.insertMany(cards);

    // await Card.create({
    //   name: "Moritz",
    //   imageUrl: "google.de",
    //   colors: ["hey", "ciao"],
    //   type: "master",
    // });

    console.log("Cards data seeded successfuly");
  } catch (error) {
    console.log(`Error while seeding data: ${error}`);
  } finally {
    mongoose.connection.close();
  }
};
fetchData();

app.use("/getCards", cardsRouter);
// app.get("/getCards", getCards);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const uri = process.env.DB_URI;
mongoose.connect(uri);
mongoose.connection
  .on("error", console.error)
  .on("open", () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
