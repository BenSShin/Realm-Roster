export function GroupsShow(props) {
  return (
    <div>
      <h1>Group</h1>
      <p>Name: {props.group.name}</p>
      <p>Schedule: {props.group.meetup}</p>
      <p>Location: {props.group.location}</p>
      <button onClick={() => props.onShowGroupUpdate()}>Update Group Info</button>
      <h2>Messages</h2>
      {/* {props.group.messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
        </div>
      ))} */}
    </div>
  );
}
