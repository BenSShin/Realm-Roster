export function GroupsShow(props) {
  return (
    <div>
      <h1 id="user_group">Group</h1>
      <p>Name: {props.group.name}</p>
      <p>Schedule: {props.group.meetup}</p>
      <p>Location: {props.group.location}</p>
      <button onClick={() => props.onShowGroupUpdate()}>Update Group Info</button>
    </div>
  );
}
