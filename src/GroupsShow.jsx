export function GroupsShow(props) {
  const messages = props.group.messages;
  return (
    <div>
      <h1 id="user_group">Group</h1>
      <p>Name: {props.group.name}</p>
      <p>Schedule: {props.group.meetup}</p>
      <p>Location: {props.group.location}</p>
      <button onClick={() => props.onShowGroupUpdate()}>Update Group Info</button>
      <h2>Message Board</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
          <p>{message.username}</p>
        </div>
      ))}
    </div>
  );
}
