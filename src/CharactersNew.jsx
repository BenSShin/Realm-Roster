import { useNavigate } from "react-router-dom";

export function CharactersNew(props) {
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    let path = "/characters";
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateCharacter(params, () => event.target.reset());
    navigate(path);
  };
  return (
    <div>
      <h1>New Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Race: <input name="race" type="text" />
        </div>
        <div>
          Level: <input name="level" type="text" />
        </div>
        <div>
          Class: <input name="character_class" type="text" />
        </div>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}
