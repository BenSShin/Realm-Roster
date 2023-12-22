/* eslint-disable react/prop-types */
export function MessagesIndex(props) {
  return (
    <div>
      <h1>Messages</h1>
      {props.messages.map((message) => (
        <div key={message.id}>
          <a onClick={() => props.onShowMessage(message)}>{message.content}</a>
        </div>
      ))}
    </div>
  );
}
