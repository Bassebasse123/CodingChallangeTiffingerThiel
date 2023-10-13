import "./App.css";
import axios from "axios";
import { useState } from "react";
import { setAxiosDefaults } from "../src/utils/axiosConfig.js";

function App() {
  const [cards, setCards] = useState();
  const handleClick = async () => {
    try {
      setAxiosDefaults();
      const response = await axios.get("http://localhost:8000/getCards");
      console.log(response);
      setCards(response.data.cards);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Click me!</button>
      <div>
        {cards?.map((card) => (
          <div>
            <h1>{card.name}</h1>
            <img src={card.imageUrl}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
