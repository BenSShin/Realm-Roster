export function CharactersShow(props) {
  return (
    <div>
      <h1>Character information</h1>
      <p>Name: {props.character.name}</p>
      <p>Level: {props.character.level}</p>
      <p>Race: {props.character.race}</p>
      <p>Description: {props.character.description}</p>
      <p>Class: {props.character.character_class}</p>
    </div>
  );
}
