import { Link } from "react-router-dom";

export function CharactersIndex(props) {
  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold pb-5">Your Characters</h1>
      {props.characters.map((character) => (
        <div key={character.id}>
          <div className="flex justify-center my-4">
            <div className="flex justify-start object-left w-[80%] h-9 bg-[#A9A9A9] rounded-md">
              <p className="capitalize pt-1 px-2">Name: {character.name}</p>
              <p className="pt-1 px-2">Race: {character.race}</p>
              <p className="pt-1 px-2">Level: {character.level}</p>
              <p className="pt-1 px-2">Class: {character.character_class}</p>
              <div className="absolute right-[10%] mt-1">
                <Link to="/character">
                  <button
                    className="text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-2"
                    onClick={() => props.onShowCharacter(character)}
                  >
                    More Info
                  </button>
                </Link>
                {parseInt(character.group_id) !== 1 ? (
                  <>
                    <Link to="/group">
                      <button
                        className="text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
                        onClick={() => {
                          props.onShowGroup(character);
                          props.onIndexMessages(character);
                        }}
                      >
                        Character Group
                      </button>
                    </Link>
                  </>
                ) : (
                  <>{console.log(parseInt(character.group_id))}</>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
