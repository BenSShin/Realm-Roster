import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../../Modal/Modal";
import { SpellShow } from "./SpellShow";

export function SpellsIndex() {
  const [spells, setSpells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);
  const [spellSearch, setSpellSearch] = useState("");
  const [spellInfo, setSpellInfo] = useState();
  const [infoVisible, setInfoVisible] = useState(false);

  const handleIndexSpells = () => {
    axios.get("/spells.json").then((response) => {
      setSpells(response.data);
    });
  };

  const handleSpellShow = (spell) => {
    setInfoVisible(true);
    setSpellInfo(spell);
  };

  const handleClose = () => {
    setInfoVisible(false);
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
      <Modal show={infoVisible} onClose={handleClose}>
        <SpellShow spell={spellInfo} />
      </Modal>
      <div className="pt-10">
        <div className="flex justify-center">
          <div className="border-2 border-white rounded-t-lg mt-2">
            <p className="px-3 pt-1 bg-[#F4BF96] rounded-t-lg">Spell Search</p>
            <input
              className="w-full bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none text-center"
              type="text"
              placeholder="Search by Spell Name . . ."
              value={spellSearch}
              onChange={(e) => setSpellSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="grid grid-cols-3 gap-5">
            {currentCards.map((spell) => (
              <div key={spell.id}>
                <div className="w-[200px]">
                  <div className="relative border-2 border-[#ECCCB2] rounded-md bg-[#FCF5ED] h-[150px] m-3">
                    <div className="">
                      <button
                        className="absolute bottom-2 right-8 w-[60%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
                        onClick={() => handleSpellShow(spell)}
                      >
                        Spell Info
                      </button>
                    </div>
                    <p className="mt-2">{spell.name}</p>
                    <p>Level: {spell.level}</p>
                    <p>{spell.classes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      </div>
    </>
  );
}
