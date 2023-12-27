export function MessagesIndex(props) {
  return (
    <div>
      <h1>Group Messages</h1>
      <div className="box-border h-50 w-60">
        {props.messages.map((message) => (
          <div key={message.id}>
            {message.user_id === parseInt(localStorage.getItem("user_id")) ? (
              <>
                <a onClick={() => props.onShowMessage(message)}>{message.content}</a>
                <p>{message.username}</p>
              </>
            ) : (
              <>
                <p>{message.content}</p>
                <p>{message.username}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
