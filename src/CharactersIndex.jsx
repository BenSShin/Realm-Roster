import { Link } from "react-router-dom";

export function CharactersIndex(props) {
  return (
    <div>
      <h1>Your Characters</h1>
      {props.characters.map((character) => (
        <div key={character.id}>
          <p>Name: {character.name}</p>
          <p>Race: {character.race}</p>
          <p>Level: {character.level}</p>
          <p>Class: {character.character_class}</p>
          <Link to="/character">
            <button onClick={() => props.onShowCharacter(character)}>More Info</button>
          </Link>
          {parseInt(character.group_id) !== 1 ? (
            <>
              <Link to="/group">
                <button
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
      ))}
    </div>
  );
}
