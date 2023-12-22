export function MessagesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateMessage(params, () => event.target.reset());
  };
  return (
    <div>
      <h1>New Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input name="content" type="text" />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
