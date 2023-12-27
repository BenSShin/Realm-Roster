import { Link } from "react-router-dom";

export function GroupsUpdatePage(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateGroup(props.group.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyGroup(props.group);
  };
  return (
    <div>
      <h1>Group information</h1>
      <p>Name: {props.group.name}</p>
      <p>Meet Up: {props.group.meetup}</p>
      <p>Location: {props.group.location}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={props.group.name} name="name" type="text" />
        </div>
        <div>
          Meet Up: <input defaultValue={props.group.meetup} name="meetup" type="text" />
        </div>
        <div>
          Location: <input defaultValue={props.group.location} name="location" type="text" />
        </div>
        <button type="submit">Update Group</button>
        <Link to="/characters">
          <button onClick={handleClick}>Delete Group</button>
        </Link>
      </form>
    </div>
  );
}
