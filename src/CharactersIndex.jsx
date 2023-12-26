import { Link } from "react-router-dom";

export function CharactersIndex(props) {
  return (
    <div>
      <h1>Your Characters</h1>
      {props.characters.map((character) => (
        <div key={character.id}>
          <p>{character.name}</p>
          <p>{character.race}</p>
          <p>{character.level}</p>
          <p>{character.character_class}</p>
          <Link to="/character">
            <button onClick={() => props.onShowCharacter(character)}>More Info</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
