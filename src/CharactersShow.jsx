import { useState } from "react";
import { Link } from "react-router-dom";

export function CharactersShow(props) {
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const handleShowUpdate = () => {
    setIsUpdateVisible(true);
  };
  const handleClose = () => {
    setIsUpdateVisible(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateCharacter(props.character.id, params, () => event.target.reset());
    props.onShowCharacter(props.character, () => event.target.reset());
  };

  return (
    <div>
      <h1>Character information</h1>
      <p>Name: {props.character.name}</p>
      <p>Level: {props.character.level}</p>
      <p>Race: {props.character.race}</p>
      <p>Class: {props.character.character_class}</p>
      <p>Description: {props.character.description}</p>
      {isUpdateVisible === true ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              Name: <input defaultValue={props.character.name} name="name" type="text" />
            </div>
            <div>
              Level: <input defaultValue={props.character.level} name="level" type="text" />
            </div>
            <div>
              Race: <input defaultValue={props.character.race} name="race" type="text" />
            </div>
            <div>
              Class: <input defaultValue={props.character.character_class} name="character_class" type="text" />
            </div>
            <div>
              Description: <input defaultValue={props.character.description} name="description" type="text" />
            </div>
            <button type="submit">Update</button>
          </form>
          <button onClick={() => handleClose()}>cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => handleShowUpdate()}>Update</button>
        </>
      )}
    </div>
  );
}
