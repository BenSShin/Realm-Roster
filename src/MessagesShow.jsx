/* eslint-disable react/prop-types */
export function MessagesShow(props) {
  return (
    <div>
      <h1>Message information</h1>
      <p>Name: {props.message.content}</p>
      <form>
        <div>
          Name: <input defaultValue={props.message.content} name="name" type="text" />
        </div>
        <button type="submit">Update message</button>
      </form>
    </div>
  );
}
