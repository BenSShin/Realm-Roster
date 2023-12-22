/* eslint-disable react/prop-types */
export function MessagesShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateMessage(props.message.id, params, () => event.target.reset());
  };
  return (
    <div>
      <p>{props.message.content}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input defaultValue={props.message.content} name="content" type="text" />
        </div>
        <button type="submit">Update message</button>
      </form>
    </div>
  );
}
