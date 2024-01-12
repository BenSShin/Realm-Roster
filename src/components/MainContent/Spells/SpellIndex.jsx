import { useState } from "react";
import axios from "axios";

export function SpellsIndex() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://realm-roster-api.onrender.com/";

  const [spells, setSpells] = useState([]);

  const handleIndexSpells = () => {
    axios.get("/spells.json").then((reponse) => {
      setSpells(response.data);
    });
  };
}
