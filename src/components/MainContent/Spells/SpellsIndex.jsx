import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-day-picker";

export function SpellsIndex() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://realm-roster-api.onrender.com/";

  const [spells, setSpells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);
  const [spellSearch, setSpellSearch] = useState("");

  const handleIndexSpells = () => {
    axios.get("/spells.json").then((response) => {
      setSpells(response.data);
    });
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = spells
    .filter((spell) => spell.name.toLowerCase().includes(spellSearch.toLowerCase()))
    .slice(indexOfFirstCard, indexOfLastCard);
  const totalCards = spells.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    // Adjust the range based on your preference
    const range = 2; // Show 3 page numbers on each side of the current page

    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    return pageNumbers.slice(start - 1, end).map((number) =>
      number === 1 || number === 27 ? (
        <></>
      ) : (
        <button
          key={number}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 ${
            currentPage === number ? "bg-blue-700" : ""
          }`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      )
    );
  };

  useEffect(handleIndexSpells, []);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by Spell Name . . ."
          value={spellSearch}
          onChange={(e) => setSpellSearch(e.target.value)}
        />
      </div>
      <div className="grid-cols-3 gap-4">
        {currentCards.map((spell) => (
          <div className="grid-cols-3 gap-4" key={spell.id}>
            <div className="grid-cols-3 gap-4">
              <p>{spell.name}</p>
              <p>{spell.level}</p>
              <p>{spell.classes}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded ml-2 ${
            currentPage === 1 ? "bg-blue-700" : ""
          }`}
          onClick={() => paginate(1)}
        >
          1
        </button>
        <div className="pagination mt-4">{renderPageNumbers()}</div>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded ml-2 ${
            currentPage === 27 ? "bg-blue-700" : ""
          }`}
          onClick={() => paginate(27)}
        >
          27
        </button>
      </div>
    </>
  );
}
