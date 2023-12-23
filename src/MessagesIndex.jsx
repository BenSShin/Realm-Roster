export function MessagesIndex(props) {
  return (
    <div>
      <h1>Your Messages</h1>
      {props.messages.map((message) => (
        <div key={message.id}>
          <a onClick={() => props.onShowMessage(message)}>{message.content}</a>
          <p>{message.username}</p>
        </div>
      ))}
    </div>
  );
}
